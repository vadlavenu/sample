import { Component } from "@angular/core";
import { RouterModule, Router } from "@angular/router";

@Component({
selector:'app-root',
templateUrl:'./app.component.html',
styleUrls:['./app.component.css']
})
export class AppComponent{
  pageTitle: string = 'Items Dash Board';
  isProductListActive:boolean = false;
  isHomeLinkActive:boolean=false;
  isAddLinkActive:boolean=false;
  constructor(private router:Router){
    this.isHomeLinkActive=true;
   //console.log('Current Active Root **** :'+activeRoot.url);
  }

  


  clickedOnProductsList():void{
   this.isProductListActive=true;
   this.isHomeLinkActive=false;
   this.isAddLinkActive=false;
  }

  clickedOnHome():void{
    this.isProductListActive=false;
   this.isHomeLinkActive=true;
   this.isAddLinkActive=false;
  }

  clickedOnAddItem():void{
    this.isProductListActive=false;
    this.isHomeLinkActive=false;
    this.isAddLinkActive=true;
  }

  logoClicked():void{
    this.isProductListActive=false;
    this.isHomeLinkActive=false;
    this.isAddLinkActive=false;
  }
}