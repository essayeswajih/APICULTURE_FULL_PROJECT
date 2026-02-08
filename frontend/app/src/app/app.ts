import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Home } from "./pages/home/home";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { ToastrDemo } from "./toastr-demo/toastr-demo";
import { CommonModule } from '@angular/common';
import { Api, Category } from './services/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer,RouterModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Apiculture';
  categories: Category[] = [];
  constructor(private apiService: Api,private cdRef: ChangeDetectorRef,) {}

  ngOnInit() {
    this.loadCategories();
  }
    private loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.menuItems = [
          {
            label: 'Accueil',
            icon: '#home',
            route: ['/'],
            active: true
          },
          {
            label: 'Boutique',
            icon: '#shop',
            id: 'boutique',
            submenu: categories.map(cat => ({
              label: cat.name,
              route: ['/boutique'],
              queryParams: { category: cat.name }
            }))
          },
          {
            label: 'À Propos',
            icon: '#info',
            route: ['/a-propos']
          },
          {
            label: 'Contact',
            icon: '#envelope',
            route: ['/contact']
          }
        ];

        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      },
    });
  }
menuItems = [
  {
    label: 'Accueil',
    icon: '#home',           // you can use any icon you have in your SVG sprite
    route: ['/'],
    active: true
  },
  {
    label: 'Boutique',
    icon: '#shop',           // or #store, #bag, whatever you have
    id: 'boutique',          // used for collapse target
    submenu: this.categories.map(cat => ({
      label: cat.name,
      route: ['/boutique'],
      queryParams: { category: cat.name }
    }))
  },
  {
    label: 'À Propos',
    icon: '#info',           // or #about, #user, etc.
    route: ['/a-propos']
  },
  {
    label: 'Contact',
    icon: '#envelope',       // or #mail, #phone, #message
    route: ['/contact']
  }
];
  // Disable right click
  /*
  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault();
  }

  // Disable Ctrl+U, Ctrl+Shift+I, F12
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    // Ctrl + U
    if (event.ctrlKey && event.key.toLowerCase() === 'u') {
      event.preventDefault();
    }

    // Ctrl + Shift + I (DevTools)
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'i') {
      event.preventDefault();
    }

    // F12
    if (event.key === 'F12') {
      event.preventDefault();
    }//
  }*/
}
