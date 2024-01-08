import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './view/header-component/header-component.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductsComponent } from './products/products.component';
import { ProductListsComponent } from './products/product-lists/product-lists.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductItemComponent } from './products/product-lists/product-item/product-item.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { StartViewComponent } from './view/start-view/start-view.component';
import { SidebarShopComponent } from './view/sidebar-shop/sidebar-shop.component';
import { CreateProductComponent } from './view/sidebar-shop/create-product/create-product.component';
import {MatIconModule} from "@angular/material/icon";
import { LoginScreenComponent } from './view/login-screen/login-screen.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    ProductsComponent,
    ProductListsComponent,
    ProductDetailsComponent,
    ProductItemComponent,
    StartViewComponent,
    SidebarShopComponent,
    CreateProductComponent,
    LoginScreenComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
