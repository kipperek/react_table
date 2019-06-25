import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MyTable from './MyTable';

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    config: [{
      model: 'name',
      name: 'Name'
    },
    {
      model: 'description',
      name: 'Description'
    }],
    data: [{
      description: 'Description1',
      name: 'Test1'
    },
    {
      description: 'Description2',
      name: 'Test2'
    }]
  }

  const enzymeWrapper = shallow(<MyTable {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('My table component', () => {
  it('should render table', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('table').hasClass('table')).toBe(true);
  });

  it('should render two columns in header', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('thead').find('th').length).toEqual(2);
  });

  it('should contain description', () => {
    const { enzymeWrapper } = setup();
    const headRow = enzymeWrapper.find('thead').childAt(0);
    expect(headRow.childAt(0).text()).toBe('Name');
    expect(headRow.childAt(1).text()).toBe('Description');
  });

  it('should render two rows with data', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('tbody').find('tr').length).toBe(2);
  });

  it('should contain data', () => {
    const { enzymeWrapper } = setup();
    const firstRow = enzymeWrapper.find('tbody').childAt(0);
    expect(firstRow.childAt(0).text()).toBe('Test1');
    expect(firstRow.childAt(1).text()).toBe('Description1');
  });

});
