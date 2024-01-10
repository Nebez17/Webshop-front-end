import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Product} from "../model/product.model";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = JSON.parse(localStorage.getItem('cartItems') || '[]')
  private cartItemCount = new BehaviorSubject<number>(this.items.length);

  constructor() { }
  getCartItemCountObservable(): Observable<number> {
    return this.cartItemCount.asObservable();
  }
  private updateCartItemCount() {
    this.cartItemCount.next(this.items.length);
  }

  addToCart(product: any) {
    const existingItem = this.items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantaty += 1;
    } else {
      this.items.push({...product, quantaty: 1});
    }

    localStorage.setItem('cartItems', JSON.stringify(this.items));
    this.updateCartItemCount();
  }

  getItems(){
    return this.items;
  }
  delete(item: any){
    this.items = this.items.filter((i) => i.id !== item.id)
    localStorage.setItem('cartItems', JSON.stringify(this.items));
    this.updateCartItemCount();

  }
  increaseQuantity(id: string){
    let item = this.items.find((i) => i.id === id);
    if(item){
      item.quantaty++;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }
  decreaseQuantity(id: string) {
    let item = this.items.find((i) => i.id === id);
    if (item && item.quantaty > 0) {
      item.quantaty--;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }
  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc + item.price * item.quantaty;
    }, 0);
  }
  clearCart() {
    if (confirm('Are you sure you want empty your shopping cart?')) {
      this.items = []; // Reset the items array to an empty array
      localStorage.removeItem('cartItems'); // Remove the cartItems from localStorage
      this.updateCartItemCount();
    }
  }
}
