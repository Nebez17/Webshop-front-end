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
    this.productService.getProducts('9a195490-6902-4f35-99c0-b78cf8c739b3').subscribe(
      products => {
        this.products = products;
        console.log(products);
      });
  }
}
