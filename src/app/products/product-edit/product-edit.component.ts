import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProduct } from './../../products/product';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../products/product.service';
import { $ } from 'jquery';
import { AppComponent } from 'src/app/app.component';


function numValidator(min:number, max:number):ValidatorFn{
  return (c:AbstractControl):{[key:string]:boolean}|null=>{
    if(c.value!==null && (isNaN(c.value) || c.value<min || c.value>max)){
      return {'range':true};
    }
    return null;
  };
}



@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  headerTitle:string='';

  
  productForm:FormGroup;
  product:IProduct;
  productNameValidation:string='';
  productCodeValidation:string='';
  productPriceValidation:string='';
  productRatingValidation:string='';
  productDateValidation:string='';
  sub:Subscription;
  errorMessage:string='';
  showLoading: boolean = false;

  // get tags():FormArray{
  //   return <FormArray>this.productForm.get('tags');
  // }

  private productNameValidationMessages={
    required :'Product Name is required',
    minlength:'Product Name should have at lease 3 characters',
    maxlength:'Product Name should not exceed 50 characters'
  }

  private productCodeValidationMessages={
    required :'Product Code is required'
  }

  private productPriceValidationMessages={
    required :'Product Price is required'
  }

  private productRatingValidationMessages={
    range : 'Product rating should be in [numaric] between 1-5'
  }

  
  private productDateValidationMessages={
    required :'Product Release Date is required',
    isDateValid:'Please enter a valid date'
  }

  constructor(private formBuilder:FormBuilder, 
              private route:ActivatedRoute, 
              private prdServ:ProductService,
               private router:Router,
               private app:AppComponent
              /* private store: Store<fromProduct.State>*/ ) { 

              }

  ngOnInit() :void{ 
  
    this.productForm=this.formBuilder.group({
      productName : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      productCode : ['',[Validators.required]],
      description : "",
      starrating  : [null,numValidator(1,5)],
      price       : ['',[Validators.required]],
      releaseDate : [null,[Validators.required]]
      //tags    : this.formBuilder.array([this.buildTags()])
    });

   
    
    this.displayValidations(this.productForm.get('productName'), 'pName');
    this.displayValidations(this.productForm.get('productCode'), 'pCode');
    this.displayValidations(this.productForm.get('starrating'), 'pRating');
    this.displayValidations(this.productForm.get('price'), 'pPrice');
    this.displayValidations(this.productForm.get('releaseDate'), 'relDate');

    //getting product id fro routeParameter
    this.sub=this.route.paramMap.subscribe(
      params=>{
        const id=+params.get('id');
        this.showLoading = true;
        setTimeout(()=>{
          this.getProduct(id);
        }, 1500);
      }
    );
  }


  getProduct(index:number):void{
    this.prdServ.getProduct(index).subscribe(
      (product:IProduct) => this.dispProduct(product),
      (error:any) => this.errorMessage=<any>error
    );
  }

  dispProduct(productRef:IProduct):void{
    if(this.productForm){
      this.productForm.reset();
    }

    this.product=productRef;

    if(this.product.id === 0){
        this.headerTitle='Add Item';
    }else{
      this.headerTitle=`Edit Item: ${this.product.productName}`;
    }

    this.productForm.patchValue({
      productName:this.product.productName,
      productCode:this.product.productCode,
      starrating:this.product.starrating,
      description:this.product.description,
      price:this.product.price,
      releaseDate:this.getProductRelDate(this.product.releaseDate)
    })
    this.showLoading = false;
   // this.productForm.setControl('tags', this.formBuilder.array(this.product.tags || []))
  }

  getProductRelDate(prdRelDate):string {
    if(prdRelDate!=null){
      const currentDate = new Date(prdRelDate);
      currentDate.setDate(currentDate.getDate() + 1)
      return currentDate.toISOString().substring(0,10);
    }else{
      return null;
    }
    
  }

  displayValidations(control,key):void{
    control.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      () => this.setValidationMessage(control, key)
    );
  }

  setValidationMessage(c:AbstractControl, key:string):void{
    if(key === 'pName'){
      this.productNameValidation='';
      if((c.touched || c.dirty) && c.errors){
        this.productNameValidation=Object.keys(c.errors).map(
          key => this.productNameValidation +=this.productNameValidationMessages[key]).join('')
      }
    }else if(key === 'pCode'){
      this.productCodeValidation='';
      if((c.touched || c.dirty) && c.errors){
        this.productCodeValidation=Object.keys(c.errors).map(
          key => this.productCodeValidation +=this.productCodeValidationMessages[key]).join('')
      }
    }else if(key === 'pRating'){
      this.productRatingValidation='';
      if((c.touched || c.dirty) && c.errors){
        this.productRatingValidation=Object.keys(c.errors).map(
          key => this.productRatingValidation +=this.productRatingValidationMessages[key]).join('')
      }
    }else if(key === 'pPrice'){
      this.productPriceValidation='';
      if((c.touched || c.dirty) && c.errors){
        this.productPriceValidation=Object.keys(c.errors).map(
          key => this.productPriceValidation +=this.productPriceValidationMessages[key]).join('')
      }
     }else if(key === 'relDate'){
      this.productDateValidation='';
      if((c.touched || c.dirty) && c.errors){
        this.productDateValidation=Object.keys(c.errors).map(
          key => this.productDateValidation +=this.productDateValidationMessages[key]).join('')
      }
     }
    
 
  }

  // buildTags():FormGroup{
  //   return this.formBuilder.group(
  //     {
  //       tags:[]
  //     }
  //   );
  // }

  // addTags():void{
  //   this.tags.push(this.buildTags());
  // }

  // deleteTag(index:number):void{
  //   this.tags.removeAt(index);
  //   this.tags.markAsDirty();
  // }

  saveProduct():void{
    if(this.productForm.valid){
      if(this.productForm.dirty){
        const np={...this.product, ...this.productForm.value}
       
        if(np.id===0){
          this.prdServ.createProduct(np).subscribe(
            () => this.onSaveComplete(),
            (error:any) => this.errorMessage=<any>error
          );
        }else{
          this.prdServ.updateProduct(np).subscribe(
            () => this.onSaveComplete(),
            (error:any) => this.errorMessage=<any>error
          );
          //this.store.dispatch(new productActions.updateActionFromComponent(np));
          //this.onSaveComplete();
        }
      }else{
        this.onSaveComplete()
      }

    }else{
      this.errorMessage="Please correct the validation Errors";
    }
  }

  onSaveComplete():void{
    //reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['./products'])
  }

  deleteProduct():void{
      if(this.product.id === 0){
          this.onSaveComplete();
      }else{
          if(confirm(`Are you sure you want to delete :${this.product.productName} `)){
              this.prdServ.deleteProduct(this.product.id).subscribe(
                ()=>this.onSaveComplete(),
                (error:any) => this.errorMessage=<any>error
              );
          }
      }
  }
  cancel():void{
    this.router.navigate(['/products']);
  }

}
