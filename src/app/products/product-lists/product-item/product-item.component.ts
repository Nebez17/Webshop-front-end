import { Component } from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/product.model";
import {CartService} from "../../../service/cart.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  public products: Product[] = []
  constructor(private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
      });
    this.productService.getProducts('15c60900-275f-4eae-bb09-ebc427e37ec2').subscribe(
      products => {
        this.products = products;
        console.log(products);
      });
  }
  addToCart(product: Product){
    this.cartService.addToCart(product)
  }

}
