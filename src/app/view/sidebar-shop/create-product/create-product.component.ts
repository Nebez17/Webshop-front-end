import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from "../../../service/product.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  productForm: FormGroup;
  isFormVisible: boolean = true;
  categoryOptions = ['Prime', 'Feastable', 'Sticks'];
  selectedCategories: string[] = [];
  showGeneralErrorMessage: boolean = false;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]], // Positive number validation
      stock: [0, [Validators.required, Validators.min(0)]], // Positive number validation
      imageURL: ['', Validators.required],
      category: this.fb.array([], Validators.required),
    });
  }

  onCategoryChange(category: string) {
    const categoryFormArray = this.productForm.get("category") as FormArray;

    if (categoryFormArray.value.includes(category)) {
      categoryFormArray.removeAt(categoryFormArray.value.indexOf(category));
    } else {
      categoryFormArray.push(this.fb.control(category));
    }
    this.selectedCategories = categoryFormArray.value;
  }

  getCategoryControl(category: string): FormControl {
    return this.fb.control(this.selectedCategories.includes(category));
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Submitted Product:', this.productForm.value);
      console.log('Selected Categories:', this.selectedCategories);
      this.isFormVisible = false;

      this.productService.addProduct(this.productForm.value).subscribe(
        (response) => {
          console.log(response);
        }
      );
    } else {
      console.log('Form is invalid. Please check the form for errors.');
      // Add logic to display a general error message
      this.showGeneralErrorMessage = true; // Add a boolean property to your component
    }
  }

  closeForm() {
    this.isFormVisible = false;
  }
}
