import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
  IAppStore,
  IProductsFetchError,
  IProductsFetchRequest,
  IProductsFetchSuccess,
  PRODUCTS_FETCH_ERROR,
  PRODUCTS_FETCH_REQUEST,
  PRODUCTS_FETCH_SUCCESS
} from './Types'

import ProductsService, { IProduct  } from '../../services/Products';

function productsFetchRequest(): IProductsFetchRequest {
  return {
    type: PRODUCTS_FETCH_REQUEST,
  }
}

function productsFetchSuccess(payload: IProduct[]): IProductsFetchSuccess {
  return {
    type: PRODUCTS_FETCH_SUCCESS,
    payload
  }
}

function productsFetchError(): IProductsFetchError {
  return {
    type: PRODUCTS_FETCH_ERROR,
  }
}

export function productsFetch(): ThunkAction<Promise<IProduct[]>, IAppStore, void, AnyAction> {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<IProduct[]> => {
    dispatch(productsFetchRequest());
    return ProductsService.getProducts().then((ret) => {
      dispatch(productsFetchSuccess(ret));
      return ret;
    }).catch((ret)=>{
      dispatch(productsFetchError());
      return ret;
    });
  }
}
