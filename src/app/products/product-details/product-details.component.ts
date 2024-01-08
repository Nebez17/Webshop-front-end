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
  showUpdateModal: boolean = false;

  productToUpdate = {
    id:"",
    description:"",
    productName:"",
    price: 0,
    imageURL:"",
    stock:0,
    category:[]
  }

  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId');
    console.log('Product ID:', this.productId);
    this.loadProduct()
  }

  private loadProduct(): void {
    this.productService.find(this.productId)
      .subscribe(product => this.product = product);
  }
  public deleteProduct(product: Product) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product.id).subscribe(
        (resp) => {
          console.log(resp);
          // You might want to navigate away or refresh the product list here
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }


  public updateProduct(){
    this.productService.updateProduct(this.productId, this.productToUpdate).subscribe(
      (resp) => {
      },
      (err) => {
      }
    );
  }
  public openEditModal(): void {
    this.showUpdateModal = true;
    this.productToUpdate = { ...this.product };
  }

  public closeEditModal(): void {
    this.showUpdateModal = false;
  }
}
