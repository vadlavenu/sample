import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { convertToSpacesPipe } from './convert-to-spaces.pipe';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {  RouterModule } from '@angular/router';
import { ProductEditComponent } from './product-edit/product-edit.component';
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { productInMemoryDbService } from './product-in-memory-db-service';
// NgRx
//import { StoreModule }  from  '@ngrx/store';
//import { ProdcutEffects } from './state/product.effects';
//import { productReducer } from './state/product.reducer';
//import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
   // InMemoryWebApiModule.forRoot(productInMemoryDbService),
    //StoreModule.forFeature('products', productReducer),
    //EffectsModule.forFeature([ProdcutEffects])
 ],
  declarations: [
    convertToSpacesPipe,
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent
  ]
})
export class ProductModule { }
