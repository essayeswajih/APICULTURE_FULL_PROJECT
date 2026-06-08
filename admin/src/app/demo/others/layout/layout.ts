import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Api, LayoutImage } from '../../../services/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {
  layoutImages: LayoutImage[] = [];
  selectedImage: LayoutImage | null = null;
  imageUrl = '';
  actionMessage = '';
  actionError = '';
  isSaving = false;

  constructor(
    private apiService: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLayoutImages();
  }

  loadLayoutImages(): void {
    this.apiService.getLayoutImages().subscribe({
      next: (images) => {
        this.layoutImages = images;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Layout image load error:', err);
        this.setActionError(err.message || 'Could not load layout images.');
      }
    });
  }

  getImage(key: string): string {
    return this.layoutImages.find((image) => image.key === key)?.image_url || '';
  }

  openEditModal(image?: LayoutImage): void {
    if (!image) {
      return;
    }
    this.selectedImage = image;
    this.imageUrl = image.image_url;
    this.actionMessage = '';
    this.actionError = '';
  }

  closeModal(): void {
    if (this.isSaving) {
      return;
    }
    this.selectedImage = null;
    this.imageUrl = '';
  }

  saveImage(): void {
    if (!this.selectedImage || !this.imageUrl.trim()) {
      this.setActionError('Please enter an image URL.');
      return;
    }

    this.isSaving = true;
    this.apiService.updateLayoutImage(this.selectedImage.key, this.imageUrl.trim()).subscribe({
      next: (updatedImage) => {
        this.layoutImages = this.layoutImages.map((image) =>
          image.key === updatedImage.key ? updatedImage : image
        );
        this.isSaving = false;
        this.selectedImage = null;
        this.imageUrl = '';
        this.setActionMessage('Layout image updated.');
      },
      error: (err) => {
        console.error('Layout image save error:', err);
        this.isSaving = false;
        this.setActionError(err.message || 'Could not save layout image.');
      }
    });
  }

  private setActionMessage(message: string): void {
    this.actionMessage = message;
    this.actionError = '';
    this.cdr.detectChanges();
  }

  private setActionError(message: string): void {
    this.actionError = message;
    this.actionMessage = '';
    this.cdr.detectChanges();
  }
}
