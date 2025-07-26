import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cart {
private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      this.updateCartItemCount(savedCartItems.length);
    }
  }

  add(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentCount = this.cartItemCountSubject.value;
      this.updateCartItemCount(currentCount + 1);
    }
  }

  remove(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentCount = this.cartItemCountSubject.value;
      if (currentCount > 0) {
        this.updateCartItemCount(currentCount - 1);
      }
    }
  }

  private updateCartItemCount(count: number): void {
    if (isPlatformBrowser(this.platformId)) {
      // Update localStorage and BehaviorSubject only in the browser
      localStorage.setItem('cartItemCount', JSON.stringify(count));
    }
    this.cartItemCountSubject.next(count);
  }
}