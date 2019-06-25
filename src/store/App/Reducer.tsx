import {
  AppActionTypes,
  IAppStore,
  PRODUCTS_FETCH_ERROR,
  PRODUCTS_FETCH_REQUEST,
  PRODUCTS_FETCH_SUCCESS
} from './Types'

const initState: IAppStore = {
  products: [],
  loading: false,
  error: false
};

export default function AppReducer(state = initState, action: AppActionTypes) {
  switch (action.type) {
    case PRODUCTS_FETCH_REQUEST:
      return { ...state, loading: true };
    case PRODUCTS_FETCH_ERROR:
      return { ...state, loading: false, error: true };
    case PRODUCTS_FETCH_SUCCESS:
      return { ...state, loading: false, products: action.payload, error: false };

    default:
      return state;
  }
}
