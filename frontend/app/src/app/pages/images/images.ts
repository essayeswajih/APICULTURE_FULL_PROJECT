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
        console.log('Images fetched successfully:', res.images);
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
  uploadImage(): void {
    if (this.selectedFile) {
      this.apiService.uploadImage(this.selectedFile).subscribe({
        next: (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round((event.loaded / event.total) * 100);
            this.cdr.detectChanges();
          } else if (event.type === HttpEventType.Response) {
            console.log('Upload complete:', event.body);
            this.uploadedUrl = event.body?.url;
            this.getAllImages(); // Refresh image list after upload
          }
        },
        error: (err) => {
          console.error('Upload error:', err);
        },
      });
    }
    this.uploadProgress = 0; // Reset progress after upload
    this.cdr.detectChanges(); // Ensure the view updates}
  }
}