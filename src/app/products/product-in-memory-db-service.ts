import { InMemoryDbService } from "angular-in-memory-web-api";
import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { JsonPipe } from "@angular/common";

@Injectable(    {
    providedIn:"root"
})
export class productInMemoryDbService implements InMemoryDbService{
    createDb(){
        const productsItemsFromInMemoryDB:IProduct[]=[ 
        {
            'id'   : 1,
            "productName" : "Garden Cart",
            "productCode" : "GDN-0023",
            "tags"        :[''],
            "releaseDate" : "March 18, 2016",
            "description" : "15 gallon capacity rolling car",
            "price"       : 32.99,
            "starrating"  : 4.2,
            "imageUrl"    : "https://openclipart.org/image/800px/svg_to_png/58471/garden-cart.png"
        },
        {
            'id'   : 2,
            "productName" : "hammer and sickle",
            "productCode" : "TBX-0048",
            "tags"        :[''],
            "releaseDate" : "May 21, 2017",
            "description" : "hammer and sickle peoples war",
            "price"       : 15.55,
            "starrating"  : 3.5,
            "imageUrl"    : "https://openclipart.org/image/800px/svg_to_png/102379/1293577124.png"
        },
        {
            'id'   : 3,
            "productName" : "computer keyboard 1",
            "productCode" : "TBX-0048",
            "tags"        :[''],
            "releaseDate" : "Jan 21, 2018",
            "description" : "a computer keyboard from a U.S. patent drawing",
            "price"       : 1500,
            "starrating"  : 3,
            "imageUrl"    : "https://openclipart.org/image/800px/svg_to_png/2395/johnny-automatic-computer-keyboard-1.png"
        }
    ];
    return {productsItemsFromInMemoryDB};  
    }

    
}