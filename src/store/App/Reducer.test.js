import AppReducer from './Reducer'
import * as types from './Types'

describe('App reducer', () => {
  it('should return the initial state', () => {
    expect(AppReducer(undefined, {})).toEqual({
      error: false, loading: false, products: []
    })
  });

  it('should handle PRODUCTS_FETCH_REQUEST', () => {
    expect(
      AppReducer(undefined, {
        type: types.PRODUCTS_FETCH_REQUEST,
      })
    ).toEqual({
      error: false, loading: true, products: []
    });
  });

  it('should handle PRODUCTS_FETCH_ERROR', () => {
    expect(
      AppReducer(undefined, {
        type: types.PRODUCTS_FETCH_ERROR,
      })
    ).toEqual({
      error: true, loading: false, products: []
    });
  });

  it('should handle PRODUCTS_FETCH_SUCCESS', () => {
    expect(
      AppReducer(undefined, {
        payload: [{name: 'Test', description: 'Test'}],
        type: types.PRODUCTS_FETCH_SUCCESS
      })
    ).toEqual({
      error: false, loading: false, products: [{name: 'Test', description: 'Test'}]
    });

    expect(
      AppReducer(undefined, {
        payload: [],
        type: types.PRODUCTS_FETCH_SUCCESS
      })
    ).toEqual({
      error: false, loading: false, products: []
    });

    expect(
      AppReducer({error: true, loading: false, products: [{name: '1', description: '1'}]}, {
        payload: [{name: '2', description: '2'}],
        type: types.PRODUCTS_FETCH_SUCCESS
      })
    ).toEqual({
      error: false, loading: false, products: [{name: '2', description: '2'}]
    });
  });
});
