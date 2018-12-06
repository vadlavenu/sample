import { Action } from "@ngrx/store";
import { IProduct } from "../product";
import { HttpErrorResponse } from "@angular/common/http";


export enum ProducctActionType {
    showProductCodeAction = "[Product] Show Product Action",
    showImageAction = "[Product] Show Image Action",
    //to load products
    loadActionFromComponent = "[Product] load",
    loadSuccessFromEffect = "[Product] load Success",
    loadFail = "[Product] load Fail",

    //to update products
    updateProduct = "[Product] update",
    updateProductSeccess = "[Product] update success",
    updateProductFailed = "[Product] update failed",


}

export class showProductCodeAction implements Action {//used completed
    readonly type = ProducctActionType.showProductCodeAction;
    constructor(public payload: boolean) { }
}

export class showImageAction implements Action {//used completed
    readonly type = ProducctActionType.showImageAction;
    constructor(public payload: boolean) { }
}

export class loadActionFromComponent implements Action {
    readonly type = ProducctActionType.loadActionFromComponent;
    constructor() {
        console.log("taken action from prd compnt");
        console.log('register this action with reducer');
    }

}

export class loadSuccessFromEffect implements Action {
    readonly type = ProducctActionType.loadSuccessFromEffect;
    constructor(public payload: IProduct[]) {
        console.log("taken action loadSuccessFromEffect from prd Efeect");
        console.log('register this action loadSuccessFromEffect with reducer');
    }
}

export class loadFail implements Action {
    readonly type = ProducctActionType.loadFail;
    constructor(public payload: string) {

    }
}


export class updateActionFromComponent implements Action {//used in componnent class while dispatching
    readonly type = ProducctActionType.updateProduct;//used in effect
    constructor(public payLoad:IProduct) {
       console.log('User trying to update the product with an Id : '+payLoad.id); 
    }

}

export class updateSuccessFromEffect implements Action {//used in effect while returning
    readonly type = ProducctActionType.updateProductSeccess;//used in reduser in switch
    constructor(public payload: IProduct) {
        console.log('updated product with an Id from effect: '+payload);
        
    }
}

export class updateFail implements Action {
    readonly type = ProducctActionType.updateProductFailed;
    constructor(public payload: string) {
        console.log('Take a error meesage from Effect in case of update failed **** : '+payload);
    }
}



export type ProductActions = showProductCodeAction
    | showImageAction
    | loadActionFromComponent
    | loadSuccessFromEffect
    | loadFail
    | updateActionFromComponent
    | updateSuccessFromEffect
    | updateFail
