import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { isPlatformBrowser } from '@angular/common';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact implements OnInit {
  contactFormModel: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    // Set SEO meta tags
    this.title.setTitle('Contact - Apiculture Galai');
    this.meta.updateTag({
      name: 'description',
      content: 'Contactez Apiculture Galai pour toute question sur nos produits apicoles ou pour des conseils en apiculture.'
    });

    // GSAP animations
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.contact-section', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.from('.contact-img', {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power3.out',
        delay: 0.4
      });
    }
  }

  onSubmit(contactForm: any): void {
    // Placeholder for form submission logic
    console.log('Form submitted:', contactForm.value);
    // Reset form
    this.contactFormModel = { name: '', email: '', subject: '', message: '' };
  }
}