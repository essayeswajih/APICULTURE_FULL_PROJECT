import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  HostListener,
} from '@angular/core';
import { SafeUrlPipe } from '../../pipe/safe-url-pipe';

import Swiper from 'swiper';
import { Autoplay, FreeMode, Navigation, Keyboard } from 'swiper/modules';
import { Api } from '../../services/api';

Swiper.use([Autoplay, FreeMode, Navigation, Keyboard]);

interface Story {
  platform: 'tiktok' | 'youtube' | 'facebook';
  url: string;
  thumbnail: string;
  title: string;
  openInNewTab?: boolean;
}

@Component({
  selector: 'app-video-stories',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './video-stories.html',
  styleUrl: './video-stories.scss',
})
export class VideoStories implements AfterViewInit, OnDestroy {

  @ViewChild('previewSwiper') previewSwiperRef?: ElementRef<HTMLDivElement>;
  @ViewChild('viewerSwiper') viewerSwiperRef?: ElementRef<HTMLDivElement>;

  stories: Story[] = [];

  currentIndex = -1;
  progress = 0;

  private readonly STORY_DURATION_MS = 30000000;

  private previewSwiper: Swiper | null = null;
  private viewerSwiper: Swiper | null = null;

  private animationFrame: number | null = null;
  private startTime = 0;

  private isBrowser: boolean;

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private api: Api
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // ------------------------------------------------
  // Lifecycle
  // ------------------------------------------------

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    this.loadStories();
    setTimeout(() => this.initPreviewSwiper());
  }

  ngOnDestroy() {
    this.stopProgress();
    this.destroySwipers();
  }
  loadStories() {
    this.api.getStories().subscribe({
      next: (data) => {
        this.stories = data.map((story) => ({
          platform: story.platform as Story['platform'],
          url: story.url,
          thumbnail: story.thumbnail,
          title: story.title,
          openInNewTab: true, // Open in new tab for better UX
        }));
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load stories:', err);
      },
    });
  }
  private destroySwipers() {
    if (this.previewSwiper) {
      this.previewSwiper.destroy(true, true);
      this.previewSwiper = null;
    }

    if (this.viewerSwiper) {
      this.viewerSwiper.destroy(true, true);
      this.viewerSwiper = null;
    }
  }

  // ------------------------------------------------
  // ESC Key
  // ------------------------------------------------

  @HostListener('document:keydown.escape')
  handleEscape() {
    if (this.currentIndex >= 0) {
      this.closeStory();
    }
  }

  // ------------------------------------------------
  // Preview Swiper
  // ------------------------------------------------

  private initPreviewSwiper() {
    if (!this.previewSwiperRef?.nativeElement) return;

    this.zone.runOutsideAngular(() => {
      this.previewSwiper = new Swiper(this.previewSwiperRef!.nativeElement, {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 14,
        freeMode: true,
        grabCursor: true,
        speed: 6000,

        autoplay: {
          delay: 1,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },

        breakpoints: {
          0: { slidesPerView: 1.3 },
          640: { slidesPerView: 2.8 },
          1024: { slidesPerView: 4.5 },
        },

        navigation: {
          nextEl: '.preview-next',
          prevEl: '.preview-prev',
        },

        observer: true,
        observeParents: true,
      });
    });
  }

  // ------------------------------------------------
  // Viewer Swiper
  // ------------------------------------------------

  private initViewerSwiper(startIndex: number) {
    if (!this.viewerSwiperRef?.nativeElement) return;

    if (this.viewerSwiper) {
      this.viewerSwiper.destroy(true, true);
      this.viewerSwiper = null;
    }

    this.zone.runOutsideAngular(() => {
      this.viewerSwiper = new Swiper(this.viewerSwiperRef!.nativeElement, {
        initialSlide: startIndex,
        slidesPerView: 1,
        loop: false,
        speed: 300,
        keyboard: { enabled: true },
        allowTouchMove: true,
        resistanceRatio: 0.85,
        longSwipesRatio: 0.2,
        threshold: 5,

        on: {
          slideChange: () => {
            if (!this.viewerSwiper) return;

            this.zone.run(() => {
              this.currentIndex = this.viewerSwiper!.activeIndex;
              this.resetProgress();
            });
          },
        },
      });
    });

    this.resetProgress();
  }

  // ------------------------------------------------
  // Story Controls
  // ------------------------------------------------

  openStory(index: number) {
    if (!this.isBrowser) return;

    this.currentIndex = index;

    setTimeout(() => {
      this.initViewerSwiper(index);
    }, 50);
  }

  closeStory() {
    this.currentIndex = -1;
    this.stopProgress();

    if (this.viewerSwiper) {
      this.viewerSwiper.destroy(true, true);
      this.viewerSwiper = null;
    }
  }

  nextStory() {
    if (!this.viewerSwiper) return;

    if (this.currentIndex < this.stories.length - 1) {
      this.viewerSwiper.slideNext();
    } else {
      this.closeStory();
    }
  }

  prevStory() {
    if (!this.viewerSwiper) return;

    if (this.currentIndex > 0) {
      this.viewerSwiper.slidePrev();
    }
  }

  // ------------------------------------------------
  // Smooth Progress Animation
  // ------------------------------------------------

  private startProgress() {
    if (!this.isBrowser) return;

    this.stopProgress();
    this.progress = 0;
    this.startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - this.startTime;
      this.progress = Math.min(
        (elapsed / this.STORY_DURATION_MS) * 100,
        100
      );

      this.cdr.detectChanges();

      if (this.progress < 100) {
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        this.nextStory();
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  resetProgress() {
    this.progress = 0;
    this.startProgress();
  }

  stopProgress() {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  // ------------------------------------------------
  // Tap Navigation
  // ------------------------------------------------

  onTap(event: MouseEvent | TouchEvent) {
    if (!this.viewerSwiper) return;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const clientX =
      'touches' in event ? event.touches[0].clientX : event.clientX;

    const x = clientX - rect.left;

    if (x < rect.width / 2) {
      this.prevStory();
    } else {
      this.nextStory();
    }

    event.stopPropagation();
  }
}