import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import MyTable from '../../components/MyTable/WithSearch';

import { IProduct, ProductsTable } from '../../services/Products';

import { productsFetch } from '../../store/App/Actions';
import { IRootStore } from '../../store/Types';

interface IProps {
  _productsFetch: typeof productsFetch;
  products: IProduct[];
  loading: boolean;
  error: boolean;
}

export class App extends React.Component<IProps> {

  public componentDidMount() {
    this.downloadProducts();
  }

  public render() {
    const { products, loading, error } = this.props;

    return (
      <div className="app content">
        <div className="row justify-content-md-center">
          <div className="col col-lg-6 col-md-12">
            { loading && <span>Loading data...</span> }
            {!loading && error && <span>There was an error downloading products</span> }
            {!loading && !error && <MyTable data={products} config={ProductsTable}/> }
          </div>
        </div>
      </div>
    );
  }

  private downloadProducts () {
    this.props._productsFetch();
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    _productsFetch: () => dispatch(productsFetch())
  }
}

const mapStateToProps = (state: IRootStore) => {
  return {
    ...state.App
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
