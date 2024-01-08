import { Component } from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../model/product.model";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  public products: Product[] = []
  constructor(private productService: ProductService) {
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
}
