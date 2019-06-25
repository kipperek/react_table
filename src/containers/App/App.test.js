import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { App } from './App';

Enzyme.configure({ adapter: new Adapter() })

const fakeProducts = [{
  description: 'Description1',
  name: 'Test1'
},
{
  description: 'Description2',
  name: 'Test2'
}];

function setup(loading = false, error = false, products = []) {
  const props = {
    _productsFetch: jest.fn(),
    error,
    loading,
    products
  };
  const enzymeWrapper = shallow(<App {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('App component', () => {
  it('should render without error', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.childAt(0).type()).toBe('div');
  });

  it('should render loading info', () => {
    const loadingText = 'Loading data...';

    let enzymeWrapper = setup(true).enzymeWrapper;
    expect(enzymeWrapper.text()).toBe(loadingText);

    enzymeWrapper = setup(true, true).enzymeWrapper;
    expect(enzymeWrapper.text()).toBe(loadingText);

    enzymeWrapper = setup(true, true, fakeProducts).enzymeWrapper;
    expect(enzymeWrapper.text()).toBe(loadingText);
  });

  it('should render error info', () => {
    const errorText = 'There was an error downloading products';

    let enzymeWrapper = setup(false, true, fakeProducts).enzymeWrapper;
    expect(enzymeWrapper.text()).toBe(errorText);

    enzymeWrapper = setup(false, true).enzymeWrapper;
    expect(enzymeWrapper.text()).toBe(errorText);
  });

  it('should render MyTable', () => {
    const { enzymeWrapper } = setup(false, false, fakeProducts);
    expect(enzymeWrapper.text()).toBe("<MyTable />");
  });

  it('should call _productsFetch at mount', () => {
    const { enzymeWrapper, props } = setup();
    expect(props._productsFetch.mock.calls.length).toBe(1);
  });

});
