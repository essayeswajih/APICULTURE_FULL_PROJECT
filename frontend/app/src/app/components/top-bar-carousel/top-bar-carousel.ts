import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
export interface TopBarItem {
  text: string;
  icon?: string;
  link?: string;
  target?: '_blank' | '_self';
  highlight?: boolean;
}
@Component({
  selector: 'app-top-bar-carousel',
  imports: [CommonModule],
  templateUrl: './top-bar-carousel.html',
  styleUrl: './top-bar-carousel.scss',
})
export class TopBarCarousel {
  items: TopBarItem[] = [
    {
      icon: '📞',
      text: '+216 55 716 454',
      link: 'tel:+21655716454'
    },
    {
      icon: '📍',
      text: 'Monastir, Tunisie',
      link: 'https://maps.app.goo.gl/3fKZcVqrGqQY11TR6',
      target: '_blank'
    },
    {
      icon: '🚚',
      text: 'Livraison gratuite à partir de 250 DT',
      highlight: true
    }
  ];

  /** Duplicate items for infinite loop */
  get duplicatedItems(): TopBarItem[] {
    return [...this.items, ...this.items];
  }
}
