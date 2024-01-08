import { Component } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {UserStorageService} from "../../service/userStorage.service";

@Component({
  selector: 'app-sidebar-shop',
  templateUrl: './sidebar-shop.component.html',
  styleUrl: './sidebar-shop.component.scss'
})
export class SidebarShopComponent {
  showCreateProduct: boolean = false;
  isCreateProductVisible: boolean = false;
  isAdmin: boolean = false;
  constructor(private userStorageService: UserStorageService) {
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

  ngOnInit(): void {
    this.isAdmin = this.userStorageService.isAdmin();
  }

  toggleCreateProductVisibility() {
    // Toggle the visibility flag
    this.isCreateProductVisible = !this.isCreateProductVisible;
  }
  toggleShowCreateProduct(): void {
    if (this.isAdmin) {
      this.showCreateProduct= !this.showCreateProduct;
    }
  }

}
