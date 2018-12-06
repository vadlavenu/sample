import * as fromRoot from '../../app.state';
import { State, createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProducctActionType } from './product.actions';
import { IProduct } from '../product';
//import { IProduct } from '../product';


export interface State extends fromRoot.State{
    products:ProductState
}


export interface ProductState{
    showProductFlag:boolean,
    showImageFlag:boolean,
    products:IProduct[],
    error:string,
    currentProdcutId:number|null
}

const initialState:ProductState={
    showProductFlag:true,
    showImageFlag:false,
    products:[],
    error:'',
    currentProdcutId:null
}

const getProductfeatureState=createFeatureSelector<ProductState>('products');


export const getShowProductCode=createSelector(
    getProductfeatureState,
    state=>state.showProductFlag
);

export const getShowImage=createSelector(
    getProductfeatureState,
    state=>state.showImageFlag
);

export const getProducts=createSelector(
    getProductfeatureState,
    state=>state.products
);



export const getError=createSelector(
    getProductfeatureState,
    state=>state.error
);

export const currentProdcutId=createSelector(
    getProductfeatureState,
    state=>state.currentProdcutId
);


// export const getProduct=createSelector(
//     getProductfeatureState,
//     state=>state.productDtl
// );

// export const getPnameCledFlag=createSelector(
//     getProductfeatureState,
//     state=>state.isPnameClicked
// );

export function productReducer(state=initialState, action:ProductActions): ProductState{

    switch (action.type) {

        case ProducctActionType.showProductCodeAction:
        console.log('Existing State : ' +JSON.stringify(state));
        console.log('pay load : '+ action.payload);
            return {
                ...state,
                showProductFlag: action.payload
            };

            case ProducctActionType.showImageAction:
            return{
                ...state,
                showImageFlag:action.payload
            } 

            case ProducctActionType.loadSuccessFromEffect:
            return {
                ...state,
                products:action.payload,
                error:''
            }

            case ProducctActionType.loadFail:
            return {
                ...state,
                products:[],
                error:action.payload
            }

            case ProducctActionType.updateProductSeccess:
            const updtedProducts=state.products.map(item => action.payload.id === item.id?action.payload:item);
            return {
                ...state,
                products:updtedProducts,
                currentProdcutId:action.payload.id, 
                error:''
            }

            case ProducctActionType.updateProductFailed:
            return {
                ...state,
                error:action.payload
            }
            
            // case ProducctActionType.productDetialAction:
            // return{
            //     ...state,
            //     productDtl:action.payload,
            //     isPnameClicked:action.isPnameClicked
            // }

        default:
            return state;
    }


}