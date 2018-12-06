import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {  Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductDetailsGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let id=+next.url[1].path;
   let isValidProductId=(id===0 || id===1 || id===2 || id===3)?true:false;
    if(isNaN(id) ||  !isValidProductId){
      alert('Invalid Item Id');
      this.router.navigate(['/products']);
      return false;
    }else{
      return true;
    }
  }
}
