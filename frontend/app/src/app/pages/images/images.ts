import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-images',
  standalone: true,
  templateUrl: './images.html',
  styleUrl: './images.scss',
})
export class Images implements OnInit {
  uploadProgress: number = 0;
  uploadedUrl?: string;
  images: string[] = [];

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
      },
      error: (err) => {
        console.error('Error fetching images:', err);
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.apiService.uploadImage(file).subscribe({
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
  }
}
