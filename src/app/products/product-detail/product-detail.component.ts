import { Component, OnInit } from '@angular/core';
import { IProduct } from "./../../products/product";
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from './../../products/product.service';
@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // data:string;
  headerTitle: string = 'Item Details';
  dataFromNestedComponent: string = '';
  product: IProduct;
  errorMessage: string = '';
  showLoading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {

  }

  back(): void {
    this.router.navigate(['/products']);
  }
  ngOnInit() {
    this.showLoading= true;
    setTimeout(()=>{    //<<<---    using ()=> syntax
      let id = +this.route.snapshot.paramMap.get('id');
      this.headerTitle += `: ${id}`;
      this.productService.getProduct(id).subscribe(
        productData => {
          this.product = productData
          this.showLoading= false;
        },
        error => this.errorMessage = <any>error
      );
      }, 1500);//after one second the method will execute
 


  }

  listenEventFromChaild(event: string): void {
    this.dataFromNestedComponent = event
  }

}
