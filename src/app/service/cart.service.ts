import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {Product} from "../model/product.model";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = JSON.parse(localStorage.getItem('cartItems') || '[]')

  constructor() { }

  addToCart(product: any){
    this.items.push({...product, quantaty :1 });
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  getItems(){
    return this.items;
  }
  delete(item: any){
    this.items = this.items.filter((i) => i.id !== item.id)
    localStorage.setItem('cartItems', JSON.stringify(this.items));

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
    if (item) {
      item.quantaty--
    }
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }
  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc + item.price * item.quantaty;
    }, 0);
  }
  clearCart() {
    this.items = []; // Reset the items array to an empty array
    localStorage.removeItem('cartItems'); // Remove the cartItems from localStorage
  }
}
