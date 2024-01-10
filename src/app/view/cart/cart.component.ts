import { Component } from '@angular/core';
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public cartService: CartService) {
  }
  deleteFromCart(item: any){
    this.cartService.delete(item)
  }

}
