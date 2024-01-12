import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/product.model";
import {CartService} from "../../service/cart.service";
import {UserStorageService} from "../../service/userStorage.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  productId: string;
  product: Product = {} as Product;// Initialize with default values or an empty object
  showUpdateModal: boolean = false;
  productToUpdate: Product = {
    id: '',
    description: '',
    productName: '',
    price: 0,
    imageURL: '',
    stock: 0,
    category: []
  };
  hardcodedCategories: string[] = ['prime5', 'test'];

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService:CartService,
              private userStorageService: UserStorageService) {
  }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId');
    console.log('Product ID:', this.productId);
    this.loadProduct()
  }

  private loadProduct(): void {
    this.productService.find(this.productId).subscribe(
      product => this.product = product,
      error => console.error('Error loading product:', error)
    );
  }
  isAdmin(): boolean {
    return this.userStorageService.isAdmin();
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


  public updateProduct() {
    if (this.productToUpdate) {
      this.productService.updateProduct(this.productId, this.productToUpdate)
        .subscribe(
          updatedProduct => {
            console.log('Product updated:', updatedProduct);
            this.loadProduct(); // Reload the product details
            this.closeEditModal(); // Close the edit modal
          },
          error => {
            console.error('Error updating product:', error);
          }
        );
    }
  }
  public openEditModal(): void {
    this.showUpdateModal = true;
    if (this.product) {
      this.productToUpdate = { ...this.product };
      this.productToUpdate.category = this.hardcodedCategories.slice(0, 1); // Assign the first category as default
    }
  }

  public closeEditModal(): void {
    this.showUpdateModal = false;
  }
  addToCart(product: Product){
    this.cartService.addToCart(product)
  }
}
