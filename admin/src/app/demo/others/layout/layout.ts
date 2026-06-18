import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Api, LayoutImage, LayoutText } from '../../../services/api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit {
  layoutImages: LayoutImage[] = [];
  layoutTexts: LayoutText[] = [];
  selectedImage: LayoutImage | null = null;
  selectedText: LayoutText | null = null;
  imageUrl = '';
  textValue = '';
  modalMode: 'image' | 'text' = 'image';
  actionMessage = '';
  actionError = '';
  isSaving = false;

  constructor(
    private apiService: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLayoutImages();
    this.loadLayoutTexts();
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

  loadLayoutTexts(): void {
    this.apiService.getLayoutTexts().subscribe({
      next: (texts) => {
        this.layoutTexts = texts;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Layout text load error:', err);
        this.setActionError(err.message || 'Could not load layout texts.');
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
    this.modalMode = 'image';
    this.selectedImage = image;
    this.selectedText = null;
    this.imageUrl = image.image_url;
    this.textValue = '';
    this.actionMessage = '';
    this.actionError = '';
  }

  openTextEditModal(text?: LayoutText): void {
    if (!text) {
      return;
    }
    this.modalMode = 'text';
    this.selectedText = text;
    this.selectedImage = null;
    this.textValue = text.text_value;
    this.imageUrl = '';
    this.actionMessage = '';
    this.actionError = '';
  }

  clearSelectedImage(): void {
    if (!this.selectedImage) {
      return;
    }

    this.imageUrl = '';
    this.saveImage(true);
  }

  closeModal(): void {
    if (this.isSaving) {
      return;
    }
    this.selectedImage = null;
    this.selectedText = null;
    this.imageUrl = '';
    this.textValue = '';
  }

  saveImage(allowEmpty = false): void {
    if (!this.selectedImage) {
      return;
    }

    if (!allowEmpty && !this.imageUrl.trim()) {
      this.setActionError('Please enter an image URL.');
      return;
    }

    this.isSaving = true;
    this.apiService.updateLayoutImage(this.selectedImage.key, allowEmpty ? '' : this.imageUrl.trim()).subscribe({
      next: (updatedImage) => {
        this.layoutImages = this.layoutImages.map((image) =>
          image.key === updatedImage.key ? updatedImage : image
        );
        this.isSaving = false;
        this.selectedImage = null;
        this.selectedText = null;
        this.imageUrl = '';
        this.textValue = '';
        this.setActionMessage('Layout image updated.');
      },
      error: (err) => {
        console.error('Layout image save error:', err);
        this.isSaving = false;
        this.setActionError(err.message || 'Could not save layout image.');
      }
      });
  }

  saveText(): void {
    if (!this.selectedText) {
      return;
    }

    if (!this.textValue.trim()) {
      this.setActionError('Please enter a text value.');
      return;
    }

    this.isSaving = true;
    this.apiService.updateLayoutText(this.selectedText.key, this.textValue.trim()).subscribe({
      next: (updatedText) => {
        this.layoutTexts = this.layoutTexts.map((text) =>
          text.key === updatedText.key ? updatedText : text
        );
        this.isSaving = false;
        this.selectedImage = null;
        this.selectedText = null;
        this.imageUrl = '';
        this.textValue = '';
        this.setActionMessage('Layout text updated.');
      },
      error: (err) => {
        console.error('Layout text save error:', err);
        this.isSaving = false;
        this.setActionError(err.message || 'Could not save layout text.');
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
