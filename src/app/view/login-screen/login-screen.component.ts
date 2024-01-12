import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserStorageService} from "../../service/userStorage.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent {
  loginForm: FormGroup;
  hidePassword = true;
  showLoginScreen: boolean = true;
  captchaResponse: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      recaptchaReactive: [null, Validators.required]
    });
  }
  onCaptchaResolved(captchaResponse: string): void {
    this.captchaResponse = captchaResponse;
    this.loginForm.controls['recaptchaReactive'].setValue(captchaResponse ? true : null);
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid && this.captchaResponse) {
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }

      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      this.authService.login(email, password).subscribe(
        (res) => {

          if (UserStorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('/shop');
          }

          console.log('res', res);
        },
        (error) => {
          console.log('error', error);

          if (error.status === 406) {
            this.snackBar.open(
              'User Is Not Active. Please Verify Email.',
              'ERROR',
              { duration: 5000 }
            );
          } else {
            this.snackBar.open('Bad credentials', 'ERROR', { duration: 5000 });
          }
        }
      );
    }
  }
}


