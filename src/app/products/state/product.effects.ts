
import { ProductService } from "../product.service";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as  prdActions from "./product.actions";
import { mergeMap, map, catchError } from "rxjs/operators";
import { IProduct } from "../product";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { Action } from "@ngrx/store";

@Injectable()
export class ProdcutEffects {
    constructor(private actions$: Actions, private prdServ: ProductService) {

    }

   @Effect()
   productLoad$:Observable<Action> = this.actions$.pipe(
        ofType(prdActions.ProducctActionType.loadActionFromComponent),//watch the any actions of this type is triggered in the application.
        mergeMap((action : prdActions.loadActionFromComponent)=> this.prdServ.getProducts().pipe(
        map((products: IProduct[]) => (new prdActions.loadSuccessFromEffect(products))),
        catchError(err => of(new prdActions.loadFail(err)))
        )
    )
   )

   @Effect()
   productUpdate$:Observable<Action> = this.actions$.pipe(
        ofType(prdActions.ProducctActionType.updateProduct),//watch the any actions of this type is triggered in the application.
        mergeMap((action : prdActions.updateActionFromComponent)=> this.prdServ.updateProduct(action.payLoad).pipe(
        map((updatedPrd: IProduct) => (new prdActions.updateSuccessFromEffect(updatedPrd))),
        catchError(err => of(new prdActions.updateFail(err)))
        )
    )
   )



    


}