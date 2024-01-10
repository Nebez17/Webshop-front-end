import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProductListsComponent} from "./products/product-lists/product-lists.component";
import {ProductDetailsComponent} from "./products/product-details/product-details.component";
import {StartViewComponent} from "./view/start-view/start-view.component";
import {LoginScreenComponent} from "./view/login-screen/login-screen.component";
import {CartComponent} from "./view/cart/cart.component";
import {SignUpComponent} from "./view/sign-up/sign-up.component";

const appRoutes: Routes =[
  {path: '', component: StartViewComponent},
  { path: 'shop', component: ProductListsComponent},
  { path: 'admin-panel', component: ProductListsComponent},
  { path: 'shop/:productId', component: ProductDetailsComponent },
  { path: 'login', component: LoginScreenComponent},
  { path: 'cart', component: CartComponent},
  { path: 'sign-up', component: SignUpComponent }
]
@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule{

}
