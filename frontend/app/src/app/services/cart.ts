import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cart {
  
  private cartItemCountSubject = new BehaviorSubject<number>(0);  // Holds the cart item count
  cartItemCount$ = this.cartItemCountSubject.asObservable();  // Observable for components to subscribe to

  constructor() {
    // Initialize cart item count from localStorage when the service is created
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.cartItemCountSubject.next(savedCartItems.length);  // Set the initial count
  }

  // Add an item to the cart (increment count)
  add(): void {
    const currentCount = this.cartItemCountSubject.value;
    this.updateCartItemCount(currentCount + 1);  // Increment the count
  }

  // Remove an item from the cart (decrement count)
  remove(): void {
    const currentCount = this.cartItemCountSubject.value;
    if (currentCount > 0) {
      this.updateCartItemCount(currentCount - 1);  // Decrement the count
    }
  }
private updateCartItemCount(count: number): void {
    this.cartItemCountSubject.next(count);  // Update the count in the BehaviorSubject
  }
}
