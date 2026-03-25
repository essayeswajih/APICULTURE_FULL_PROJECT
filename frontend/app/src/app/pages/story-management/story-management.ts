import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef
} from '@angular/core';
import { Api, Story } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { gsap } from 'gsap';

@Component({
  selector: 'app-story-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './story-management.html',
  styleUrls: ['./story-management.scss']
})
export class StoryManagement implements OnInit {

  stories: Story[] = [];

  platformList = [
    { name: 'instagram', label: 'Instagram', enabled: true },
    { name: 'tiktok', label: 'TikTok', enabled: true },
    { name: 'youtube', label: 'YouTube', enabled: true },
    { name: 'facebook', label: 'Facebook (Coming Soon)', enabled: false }
  ];

  newStory: Story = this.getEmptyStory();
  video_id: string = '';

  editMode = false;
  editStoryId: number | null = null;

  constructor(
    private apiService: Api,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadStories();
  }

  // =========================
  // CRUD
  // =========================

  addStory() {
    // Set thumbnail if empty
    if (!this.newStory.thumbnail && this.video_id) {
      this.newStory.thumbnail = this.getThumbnailFromVideoId();
    }

    if (this.editMode && this.editStoryId) {
      this.apiService.updateStory(this.editStoryId, this.newStory).subscribe({
        next: () => {
          this.resetForm();
          this.loadStories();
        },
        error: err => console.error('Update failed:', err)
      });
    } else {
      this.apiService.addStory(this.newStory).subscribe({
        next: () => {
          this.resetForm();
          this.loadStories();
        },
        error: err => console.error('Add failed:', err)
      });
    }
  }

  editStory(story: Story) {
    this.newStory = { ...story };
    this.editMode = true;
    this.editStoryId = story.id;
    this.video_id = this.extractVideoId(story.url, story.platform);
  }

  deleteStory(id: number) {
    this.apiService.deleteStory(id).subscribe(() => {
      this.loadStories();
    });
  }

  resetForm() {
    this.newStory = this.getEmptyStory();
    this.video_id = '';
    this.editMode = false;
    this.editStoryId = null;
  }

  getEmptyStory(): Story {
    return {
      id: 0,
      platform: '',
      url: '',
      thumbnail: '',
      title: '',
      periority: 1,
      created_at: '',
      updated_at: ''
    };
  }

  trackById(index: number, story: Story): number {
    return story.id;
  }

  // =========================
  // LOAD STORIES
  // =========================

  private loadStories() {
    this.apiService.getStories().subscribe(stories => {
      this.stories = stories;
      this.cdRef.detectChanges();

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          const cards = document.querySelectorAll('.story-card');
          if (cards.length > 0) {
            gsap.from(cards, {
              opacity: 0,
              y: 20,
              duration: 0.5,
              stagger: 0.1,
              force3D: false          // ← Add this line (or "force3D: 'auto'" sometimes helps too)
            });
          }
        }, 0);
      }
    });
  }

  // =========================
  // EMBED PREVIEW
  // =========================

  get embedUrl(): SafeResourceUrl | null {
    if (!this.video_id || !this.newStory.platform) return null;

    let url = '';

    switch (this.newStory.platform) {
      case 'youtube':
        url = `https://www.youtube.com/embed/${this.video_id}?autoplay=1`;
        this.newStory.url = url; // Update URL for YouTube to ensure correct embedding
        this.cdRef.markForCheck();
        break;

      case 'instagram':
        url = `https://www.instagram.com/p/${this.video_id}/embed/`;
        this.newStory.url = url; // Update URL for Instagram to ensure correct embedding
        this.cdRef.markForCheck();
        break;

      case 'tiktok':
        url = `https://www.tiktok.com/embed/v2/${this.video_id}`;
        this.newStory.url = url; // Update URL for TikTok to ensure correct embedding
        this.cdRef.markForCheck();
        break;

      default:
        return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private getThumbnailFromVideoId(): string {
    switch (this.newStory.platform) {
      case 'youtube':
        return `https://img.youtube.com/vi/${this.video_id}/hqdefault.jpg`;
      default:
        return '';
    }
  }

private extractVideoId(url: string, platform: string): string {
  if (!url) return '';

  try {
    if (platform === 'youtube') {
      const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      return match ? match[1] : '';
    }

    if (platform === 'tiktok') {
      // Match /embed/v2/VIDEO_ID
      const match = url.match(/\/embed\/v2\/([0-9A-Za-z]+)/);
      return match ? match[1] : '';
    }

    if (platform === 'instagram') {
      const parts = url.split('/');
      return parts[parts.length - 2] || '';
    }

    return '';
  } catch {
    return '';
  }
}

}