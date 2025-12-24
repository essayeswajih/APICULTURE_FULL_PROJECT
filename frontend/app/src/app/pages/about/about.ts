import { Component, effect, signal, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [RouterModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    // GSAP animations
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.about-section', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.from('.about-img', {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power3.out',
        delay: 0.4
      });
    }
  }
}