import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // GSAP animations for bees
      setTimeout(() => {
        gsap.to('#bee', {
          x: '80vw',
          y: '50vh',
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
        gsap.to('#bee1', {
          x: '-80vw',
          y: '20vh',
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }, 0);  // Ensures the animation runs after the view is initialized
    }
  }
}