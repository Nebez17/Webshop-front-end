import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UserStorageService} from "../../service/userStorage.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit, OnDestroy {
  isNavbarScrolled: boolean = false;
  isLoggedIn: boolean;
  private loginSubscription: Subscription;
  cartItemCount: number = 0;


  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Detect the scroll position and toggle the class accordingly
    this.isNavbarScrolled = window.scrollY > 0;
  }
  constructor(private userStorageService: UserStorageService) {
    this.updateCartItemCount();
  }

  ngOnInit(): void {
    this.loginSubscription = this.userStorageService.isLoggedInObservable.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
  updateCartItemCount() {
    const storedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

    if (Array.isArray(storedCart)) {
      this.cartItemCount = storedCart.length;
    } else {
      this.cartItemCount = 0;
    }
  }

  logout(): void {
    this.userStorageService.signOut();
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

}
