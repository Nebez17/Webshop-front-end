import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent {
  isNavbarScrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Detect the scroll position and toggle the class accordingly
    this.isNavbarScrolled = window.scrollY > 0;
  }
}
