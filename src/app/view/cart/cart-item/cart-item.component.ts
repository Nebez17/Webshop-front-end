import { Component } from '@angular/core';
import {CartService} from "../../../service/cart.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  constructor(public cartService: CartService) {
  }
  deleteFromCart(item: any){
    this.cartService.delete(item)
  }

}
