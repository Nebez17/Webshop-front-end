import { Component } from '@angular/core';
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-sidebar-shop',
  templateUrl: './sidebar-shop.component.html',
  styleUrl: './sidebar-shop.component.scss'
})
export class SidebarShopComponent {
  showCreateProduct: boolean = false;
  constructor(private productService: ProductService) {
  }
  selectedCategories: string[] = [];

  toggleCategory(category: string) {
    const index = this.selectedCategories.indexOf(category);

    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }

    console.log('Selected Categories:', this.selectedCategories);
  }
  isCreateProductVisible: boolean = false;

  toggleCreateProductVisibility() {
    // Toggle the visibility flag
    this.isCreateProductVisible = !this.isCreateProductVisible;
  }

}
