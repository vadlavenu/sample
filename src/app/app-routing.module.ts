import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductDetailsGuard } from './products/product-detail/product-details.guard';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';


const routes: Routes = [
  {
    path:'products', 
    component:ProductListComponent
  },
  {
    path:'products/:id', 
    canActivate:[ProductDetailsGuard], 
    component:ProductDetailComponent
  },
  {
    path:'products/:id/edit', 
    component:ProductEditComponent
  },
  {
    path:'products/:id/add', 
    component:ProductEditComponent
  },
  {
    path:'welcome', 
    component:WelcomeComponent
  },
  {
    path:'', 
    redirectTo:'welcome', 
    pathMatch:'full'
  },
  {
    path:'**', 
    redirectTo:'welcome',
     pathMatch:'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
