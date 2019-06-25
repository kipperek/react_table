import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from './Actions'
import * as types from './Types'
import ProductsService from '../../services/Products';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const productsFake = [{
  description: 'Test description1',
  name: 'Test12'
}];

describe('Download products', () => {
  it('creates PRODUCTS_FETCH_SUCCESS when fetching products succeedded', () => {
    ProductsService.getProducts = () => {
      return new Promise((resolve) => {
        resolve(productsFake);
      });
    };

    const expectedActions = [
      { type: types.PRODUCTS_FETCH_REQUEST },
      { type: types.PRODUCTS_FETCH_SUCCESS, payload: [].concat(productsFake) }
    ];
    const store = mockStore({});

    return store.dispatch(actions.productsFetch()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  });

  it('creates PRODUCTS_FETCH_ERROR when fetching products failed', () => {
    ProductsService.getProducts = () => {
      return new Promise((resolve, reject) => {
        reject();
      });
    };

    const expectedActions = [
      { type: types.PRODUCTS_FETCH_REQUEST },
      { type: types.PRODUCTS_FETCH_ERROR }
    ];
    const store = mockStore({});

    return store.dispatch(actions.productsFetch()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
