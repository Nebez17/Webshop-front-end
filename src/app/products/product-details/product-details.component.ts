import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  productId: string;
  product: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId');
    console.log('Product ID:', this.productId);
    this.loadPlatform()
  }

  private loadPlatform(): void {
    this.productService.find(this.productId)
      .subscribe(product => this.product = product);
  }

}
