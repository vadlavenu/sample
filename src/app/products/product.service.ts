import { Injectable } from "@angular/core";
import { IProduct} from './product'
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError,tap, map } from "rxjs/operators";
//import { productInMemoryDbService } from './product-in-memory-db-service'
@Injectable(    {
        providedIn:"root"
    })
export class ProductService{ 
    //private productURL='api/products/product.json';reads data from json file.
    //private productURL='api/productsItemsFromInMemoryDB';//reads data from created In memoryDb name should be equal to name in the in memroy db service.
    private productURL="http://localhost:8080/";
    constructor(private http:HttpClient){
       
    } 
    
    getProducts():Observable<IProduct[]>{
        return  this.http.get<IProduct[]>(this.productURL+"getProducts").pipe(
            tap(data => console.log("All :" + data),
            catchError(this.handleError)));
    }

    getProduct(id:number):Observable<IProduct>{
        if(id===0){
            return of(this.initProduct());
        }
        let url=this.productURL+"getProduct/"+id;

        return  this.http.get<IProduct>(url).pipe(
            tap(data => console.log("product data :" + data),
            catchError(this.handleError)));
    }


    createProduct(product:IProduct):Observable<IProduct>{
        const headers=new HttpHeaders({'Content-Type':'application/json'});
        let url=this.productURL+"createProduct";
        return this.http.post<IProduct>(url, product, {headers:headers}).pipe(
            tap(newProduct => console.log('Newly Created Product : '+JSON.stringify(newProduct))),
            map((newProduct)=>newProduct),
            catchError(this.handleError)
        );

    }

    deleteProduct(id:number):Observable<{}>{
        const headers=new HttpHeaders({'Content-Type':'application/json'});
        let url=this.productURL+"deleteProduct/"+id;
        return this.http.get<{}>(url, {headers:headers}).pipe(
            tap(data => console.log('deleted Product : '+id)),
            catchError(this.handleError)
        );

    }

    updateProduct(product:IProduct):Observable<IProduct>{
    const headers=new HttpHeaders({'Content-Type':'application/json'});
    let url=this.productURL+"updateProduct";

    return this.http.put<IProduct>(url,product, {headers:headers}).pipe(
            tap((updatedProduct) => console.log('Updateed Product : '+JSON.stringify(updatedProduct))),
            //return theproduct on update
            map((updatedProduct)=>updatedProduct),
            catchError(this.handleError)
        );
    }

    

    
    
    initProduct():IProduct{
        return {
                "id"   : 0,
                "productName" : null,
                "productCode" : null,
                "tags"        :[''],
                "releaseDate" : null,
                "description" : null,
                "price"       : null,
                "starrating"  : null,
                "imageUrl"    : null
        };
    }

    private handleError(err:HttpErrorResponse){
        let errorMsg='';
        if(err.error instanceof ErrorEvent){
            errorMsg=`An Error accured ${err.error.message}`;
        }else{
            errorMsg=`The server responded with the code ${err.status} 
                        and the message is ${err.message}`;
        }
        console.error(errorMsg);
        return throwError(errorMsg);
    }
    
}