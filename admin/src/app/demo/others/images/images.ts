import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../../services/api';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-images',
  imports: [
    CommonModule,
  ],
  templateUrl: './images.html',
  styleUrl: './images.scss'
})
export class Images implements OnInit {
  uploadProgress: number = 0;
  uploadedUrls: string[] = [];
  images: string[] = [];
  selectedFiles: File[] = [];
  isUploading = false;
  currentUploadIndex = 0;
  actionMessage = '';
  actionError = '';

  constructor(
    private apiService: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages(): void {
    this.apiService.getAllImages().subscribe({
      next: (res) => {
        this.images = res.images;
        this.cdr.detectChanges(); // Ensure the view updates with the new images
      },
      error: (err) => {
        console.error('Error fetching images:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFiles = Array.from(input.files ?? []);
    this.uploadedUrls = [];
    this.uploadProgress = 0;
    this.currentUploadIndex = 0;
  }

  getFilename(imageUrl: string): string {
    const fallback = imageUrl.split('/').pop() || '';

    try {
      return decodeURIComponent(new URL(imageUrl).pathname.split('/').pop() || fallback);
    } catch {
      return decodeURIComponent(fallback);
    }
  }

  copyImageAddress(imageUrl: string): void {
    navigator.clipboard.writeText(imageUrl).then(() => {
      this.setActionMessage('Image address copied.');
    }).catch((err) => {
      console.error('Copy error:', err);
      this.setActionError('Could not copy image address.');
    });
  }

  renameImage(imageUrl: string): void {
    const currentFilename = this.getFilename(imageUrl);
    const newFilename = window.prompt('Rename image', currentFilename)?.trim();

    if (!newFilename || newFilename === currentFilename) {
      return;
    }

    this.apiService.renameImage(currentFilename, newFilename).subscribe({
      next: () => {
        this.setActionMessage('Image renamed.');
        this.getAllImages();
        this.uploadedUrls = this.uploadedUrls.filter((url) => url !== imageUrl);
      },
      error: (err) => {
        console.error('Rename error:', err);
        this.setActionError(err.message || 'Could not rename image.');
      }
    });
  }

  deleteImage(imageUrl: string): void {
    const filename = this.getFilename(imageUrl);

    if (!window.confirm(`Delete ${filename}?`)) {
      return;
    }

    this.apiService.deleteImage(filename).subscribe({
      next: () => {
        this.images = this.images.filter((image) => image !== imageUrl);
        this.uploadedUrls = this.uploadedUrls.filter((url) => url !== imageUrl);
        this.setActionMessage('Image deleted.');
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Delete error:', err);
        this.setActionError(err.message || 'Could not delete image.');
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

  private getErrorReason(err: unknown): string {
    return err instanceof Error && err.message ? err.message : 'Unknown error.';
  }

  uploadImage(): void {
    if (this.selectedFiles.length === 0 || this.isUploading) {
      if (this.selectedFiles.length === 0) {
        this.setActionError('Upload failed: no images selected.');
      }
      return;
    }

    this.isUploading = true;
    this.uploadedUrls = [];
    this.currentUploadIndex = 0;
    this.uploadProgress = 0;
    this.actionMessage = '';
    this.actionError = '';
    this.uploadNextImage();
  }

  private uploadNextImage(): void {
    const file = this.selectedFiles[this.currentUploadIndex];

    if (!file) {
      this.isUploading = false;
      this.uploadProgress = 100;
      const count = this.uploadedUrls.length;
      this.setActionMessage(`${count} image${count === 1 ? '' : 's'} uploaded successfully.`);
      this.getAllImages();
      this.cdr.detectChanges();
      return;
    }

    this.apiService.uploadImage(file).subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          const fileProgress = event.loaded / event.total;
          this.uploadProgress = Math.round(((this.currentUploadIndex + fileProgress) / this.selectedFiles.length) * 100);
          this.cdr.detectChanges();
        } else if (event.type === HttpEventType.Response) {
          const uploadedUrl = event.body?.url;
          if (uploadedUrl) {
            this.uploadedUrls.push(uploadedUrl);
          }
          this.currentUploadIndex += 1;
          this.uploadNextImage();
        }
      },
      error: (err) => {
        console.error('Upload error:', err);
        this.setActionError(`Upload failed for "${file.name}": ${this.getErrorReason(err)}`);
        this.isUploading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
