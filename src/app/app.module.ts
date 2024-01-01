import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header/header-component/header-component.component';
import {FormsModule} from "@angular/forms";
import {DropdownDirective} from "./dropdown.direcitive";
import { ProductsComponent } from './products/products.component';
import { ProductListsComponent } from './products/product-lists/product-lists.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductItemComponent } from './products/product-lists/product-item/product-item.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    DropdownDirective,
    ProductsComponent,
    ProductListsComponent,
    ProductDetailsComponent,
    ProductItemComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
