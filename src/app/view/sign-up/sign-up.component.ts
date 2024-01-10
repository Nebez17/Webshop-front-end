import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  productForm: FormGroup;
  confirmPasswordControl: FormControl;
  constructor(private fb: FormBuilder, private userService: UserService,  private router: Router) {
    this.productForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      adres: ['', [Validators.required, Validators.min(0)]], // Positive number validation
      postcode: [0, [Validators.required, Validators.min(0), postcodeValidator]], // Custom postcode validator
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]], // Custom password validator
    });
    function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
      const password = control.value;
      if (password && password.length >= 8) {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (hasUppercase && hasLowercase && hasNumber) {
          return null; // Password is valid
        }
      }

      return { 'passwordRequirements': true };
    }
    this.confirmPasswordControl = new FormControl('', {
      validators: Validators.required,
      updateOn: 'blur'
    });
    function postcodeValidator(control: AbstractControl): { [key: string]: boolean } | null {
      const postcode = control.value;
      if (postcode && postcode.toString().length < 5) {
        return { 'postcodeLength': true };
      }
      return null;
    }
  }
  isPasswordMatching(): boolean {
    if (this.productForm.get('password').value !== this.confirmPasswordControl.value) {
      this.confirmPasswordControl.setErrors({ 'passwordMismatch': true });
      return false;
    }
    this.confirmPasswordControl.setErrors(null);
    return true;
  }

  onSubmit() {
    if (this.productForm.valid && this.isPasswordMatching()) {
      console.log('Submitted Product:', this.productForm.value);


      this.userService.addUser(this.productForm.value).subscribe(
        (response) => {
          console.log(response);
        }
      );
      this.router.navigateByUrl('/shop');
    } else {
      console.log('Form is invalid. Please check the form for errors.');
    }
  }
}
