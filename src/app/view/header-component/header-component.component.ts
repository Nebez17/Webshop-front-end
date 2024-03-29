import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UserStorageService} from "../../service/userStorage.service";
import {Subscription} from "rxjs";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit, OnDestroy {
  isNavbarScrolled: boolean = false;
  isLoggedIn: boolean;
  isAdmin: boolean = false;
  private loginSubscription: Subscription;
  private cartItemCountSubscription: Subscription;
  cartItemCount: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isNavbarScrolled = window.scrollY > 0;
  }

  constructor(private userStorageService: UserStorageService,
              private cartService: CartService) {}

  ngOnInit(): void {
    this.loginSubscription = this.userStorageService.isLoggedInObservable.subscribe(status => {
      this.isLoggedIn = status;
      this.isAdmin = this.userStorageService.isAdmin(); // Check if user is admin
    });

    this.cartItemCountSubscription = this.cartService.getCartItemCountObservable().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  logout(): void {
    this.userStorageService.signOut();
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
    if (this.cartItemCountSubscription) {
      this.cartItemCountSubscription.unsubscribe();
    }
  }
}
