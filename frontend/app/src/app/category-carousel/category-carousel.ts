import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { Category } from '../services/api';

@Component({
  selector: 'app-category-carousel',
  imports: [CommonModule],
  templateUrl: './category-carousel.html',
  styleUrl: './category-carousel.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoryCarousel {
  @Input() categories: Category[] = [];
  swiperConfig = {
    breakpoints: {
      320: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
      1200: { slidesPerView: 5 },
    },
    navigation: {
      nextEl: '.category-carousel-next',
      prevEl: '.category-carousel-prev',
    },
  };

}