import {Component, OnInit} from '@angular/core';
import {Categorie} from "../../model/categorie.model";
import {CategorieService} from "../../service/categorie.service";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.scss'
})
export class CategorieComponent implements OnInit {
  categories: Categorie[];
  newCategoryName: string = '';
  editingIndex: number | null = null;
  editedCategoryName: string = '';

  constructor(private categorieService: CategorieService) {}
  ngOnInit(): void {
    this.categorieService.categories$.subscribe(categories => {
      this.categories = categories;
    });
    this.categorieService.fetchCategories();
  }
  startEditing(index: number, category: Categorie) {
    this.editingIndex = index;
    this.editedCategoryName = category.name; // Store the current category name for editing
  }
  public deleteCategorie(categorie: Categorie) {
    if (confirm('Are you sure you want to delete this categorie, all the products that have this categorie will also be deleted!?')) {
      this.categorieService.deleteCategory(categorie.id).subscribe(
        () => {
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
  updateCategory(category: Categorie) {
    if (this.editedCategoryName.trim() === '') {
      console.error('Category name cannot be empty');
      return;
    }

    const updatedCategory: Categorie = {
      ...category,
      name: this.editedCategoryName,
    };

    this.categorieService.updateCategorie(updatedCategory.id, updatedCategory).subscribe(
      () => {
        this.categories[this.editingIndex].name = this.editedCategoryName;
        this.editingIndex = null;
        this.editedCategoryName = '';
      },
      error => {
        console.error('Update failed:', error);
      }
    );
  }

  createCategory() {
    if (this.newCategoryName.trim() !== '') {
      // Call service method to create the category
      this.categorieService.addCategorie({ name: this.newCategoryName }).subscribe(
        response => {
          console.log('Category created:', response);
          this.newCategoryName = ''; // Reset the field after successful creation
          // You may also want to update the category list in your component
        },
        error => {
          console.error('Error creating category:', error);
        }
      );
    } else {
      console.error('Category name is required');
    }
    this.newCategoryName = '';
  }

}
