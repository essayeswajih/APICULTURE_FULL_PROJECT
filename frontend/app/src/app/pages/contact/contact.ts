import { ToastrService } from 'ngx-toastr';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { isPlatformBrowser } from '@angular/common';
import { Api } from '../../services/api';

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
    sujet: '',
    message: ''
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title,
    private ToastrService: ToastrService,
    private ApiService: Api, // Inject Api service
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
    const { name, email, sujet, message } = contactForm.value;
    this.ApiService.sendContactMessage(name, email, sujet, message).subscribe({
      next: () => {
        this.ToastrService.success('Message envoyé avec succès', 'Succès', {
          timeOut: 2000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
          closeButton: true,
        });
        contactForm.reset(); // Reset form after successful submission
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi du message:', err);
        this.ToastrService.error('Erreur lors de l\'envoi du message', 'Erreur', {
          timeOut: 2000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
          closeButton: true,
        });
      }
    });
  }
}