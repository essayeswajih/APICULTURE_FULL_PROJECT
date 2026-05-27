import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../services/api';
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
  uploadedUrl?: string;
  images: string[] = [];
  selectedFile?: File;
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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
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
        if (this.uploadedUrl === imageUrl) {
          this.uploadedUrl = undefined;
        }
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
    if (!this.selectedFile) {
      this.setActionError('Upload failed: no image selected.');
      return;
    }

    const filename = this.selectedFile.name;
    this.uploadProgress = 0;
    this.actionMessage = '';
    this.actionError = '';

    this.apiService.uploadImage(this.selectedFile).subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round((event.loaded / event.total) * 100);
          this.cdr.detectChanges();
        } else if (event.type === HttpEventType.Response) {
          this.uploadedUrl = event.body?.url;
          this.uploadProgress = 100;
          this.setActionMessage(`Uploaded "${filename}" successfully.`);
          this.getAllImages(); // Refresh image list after upload
        }
      },
      error: (err) => {
        console.error('Upload error:', err);
        this.uploadProgress = 0;
        this.setActionError(`Upload failed for "${filename}": ${this.getErrorReason(err)}`);
      },
    });
  }
}
