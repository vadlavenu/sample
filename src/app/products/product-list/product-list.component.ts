import { Component, Input, OnInit } from "@angular/core";
import { IProduct } from "./../../products/product";
import { ProductService } from './../../products/product.service';
//import { Store, select } from "@ngrx/store";
//import * as fromProduct from './../state/product.reducer';
//import * as productActions from './../state/product.actions';
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductService]
})
export class ProductListComponent implements OnInit {
    headerTitle: string = 'Items List';
    dataFromNestedComponent: string = '';
    dispalyCode: boolean = false;
    showLoading: boolean = false;
    error$:Observable<string>;
    _listFilter: string;
    errorMessage: string;

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    btnTxtFlag: boolean = false;
    imageW: number = 50;
    imageMrgn: number = 2;
    filteredProducts: IProduct[];
    products: IProduct[];

    ngOnInit(): void {
        this.showLoading=true;
        setTimeout(()=>{    //<<<---    using ()=> syntax
            this.loadProducts();
       }, 1500);//after one second the method will execute
        
        //this.showOrHideProductCode();
        //this.showOrHideImage();
    }

    loadProducts() {
        //With out using redx
      
        this.productService.getProducts().subscribe(
            products => {
                this.assignProducts(products);
            },
            error => this.errorMessage = <any>error
        );
        //calling using redx
        //this.error$=this.store.pipe(select(fromProduct.getError))
        //this.store.dispatch(new productActions.loadActionFromComponent());
        //this.getProductsWhenSuccessFromEffect();
    }

// getProductsWhenSuccessFromEffect(){
//     this.store.pipe(select(fromProduct.getProducts)
//     ).subscribe(
//         products => {
//             this.showLoading=false;
//             this.assignProducts(products);
            
//         },
//         error => {
//             this.error$=this.store.pipe(select(fromProduct.getError))
//         }
        
//     )
// }

    assignProducts(result) {
        this.products = result,
        this.filteredProducts = this.products;
        console.log('After gettiing products');
        this.showLoading=false;
  }

    // showOrHideProductCode(): void {
    //     this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
    //         showProductFlag => this.dispalyCode = showProductFlag
    //     );
    // }
    // showOrHideImage(): void {
    //     this.store.pipe(select(fromProduct.getShowImage)).subscribe(
    //         showImageFlag => this.btnTxtFlag = showImageFlag
    //     );
    // }

    btnClick(value): void {
        this.btnTxtFlag = !this.btnTxtFlag;
        //this.store.dispatch(new productActions.showImageAction(this.btnTxtFlag))
    }

    performFilter(searchString: string) {
        return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1);
    }

    listenEventFromChaild(event: string): void {
        this.dataFromNestedComponent = event
    }

    constructor(private productService: ProductService, /*private store: Store<fromProduct.State>,*/ private router: Router) {
    }

    showProductCode(value: boolean): void {
        this.dispalyCode=value;
        // this.store.dispatch({
        //     type: 'SHOW_PRD_CODE',
        //     payload: value
        // });
        //this.store.dispatch(new productActions.showProductCodeAction(value))
    }

}