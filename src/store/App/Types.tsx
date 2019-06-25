import { IProduct } from '../../services/Products';

export interface IAppStore {
  products: IProduct[];
  loading: boolean;
  error: boolean;
}

export const PRODUCTS_FETCH_REQUEST = '@app/PRODUCTS_FETCH_REQUEST'
export interface IProductsFetchRequest {
  type: typeof PRODUCTS_FETCH_REQUEST
}

export const PRODUCTS_FETCH_SUCCESS = '@app/PRODUCTS_FETCH_SUCCESS'
export interface IProductsFetchSuccess {
  type: typeof PRODUCTS_FETCH_SUCCESS,
  payload: IProduct[]
}

export const PRODUCTS_FETCH_ERROR = '@app/PRODUCTS_FETCH_ERROR'
export interface IProductsFetchError {
  type: typeof PRODUCTS_FETCH_ERROR
}

export type AppActionTypes =
    IProductsFetchRequest
  | IProductsFetchSuccess
  | IProductsFetchError;
