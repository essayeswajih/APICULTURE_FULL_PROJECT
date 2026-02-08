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
      text: '+216 27 612 500',
      link: 'tel:+21627612500'
    },
    {
      icon: '📞',
      text: '+216 73 200 169',
      link: 'tel:+21673200169'
    },
    {
      icon: '📍',
      text: 'Notre localisation',
      link: 'https://maps.app.goo.gl/w2ytnYAKSZDmjznh6',
      target: '_blank'
    },
    {
      icon: '🚚',
      text: 'Livraison gratuite à partir de 300 DT',
      highlight: true
    }
  ];

  /** Duplicate items for infinite loop */
  get duplicatedItems(): TopBarItem[] {
    return [...this.items, ...this.items];
  }
}
