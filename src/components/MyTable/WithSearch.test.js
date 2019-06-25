import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TableWithSearch from './WithSearch';
import MyTable from './MyTable';

Enzyme.configure({ adapter: new Adapter() })

function setup(customData = null) {
  const props = {
    config: [
      { model: 'name', name: 'Name' },
      { model: 'description', name: 'Description' }
    ],
    data: customData || [
      { description: 'TV', name: '1080p' },
      { description: 'Super phone', name: 'Motorola' },
      { description: 'Samsung', name: 'Mobile phone' },
      { description: 'Company', name: 'Maersk' },
      { description: '', name: 'algae' },
      { description: 'Aegis', name: 'some name' }
    ]
  }

  const enzymeWrapper = shallow(<TableWithSearch {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('My table with search component', () => {
  it('should render table and search input', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.childAt(0).find('input').length).toBe(1);
    expect(enzymeWrapper.childAt(1).type()).toBe(MyTable);
  });

  it('should render no result for empty array', () => {
    const { enzymeWrapper } = setup([]);
    expect(enzymeWrapper.contains('There are no results for provided query.')).toBe(true);
  });

  it('should render no result for not matching query', () => {
    const { enzymeWrapper } = setup();
    const input = enzymeWrapper.find('input');
    input.simulate('change', { target: { value: 'asdasdsadasdasdasdas'} });
    expect(enzymeWrapper.contains('There are no results for provided query.')).toBe(true);
  });

  it('should find only tv', () => {
    const { enzymeWrapper } = setup();
    const input = enzymeWrapper.find('input');
    input.simulate('change', { target: { value: 'Tv'} });
    expect(enzymeWrapper.state().filteredData).toEqual([
      { description: 'TV', name: '1080p' }
    ]);
  });

  it('should match ae', () => {
    const { enzymeWrapper } = setup();
    const input = enzymeWrapper.find('input');
    input.simulate('change', { target: { value: 'ae'} });
    expect(enzymeWrapper.state().filteredData).toEqual([
      { description: 'Company', name: 'Maersk' },
      { description: 'Aegis', name: 'some name' },
      { description: '', name: 'algae' }
    ]);
  });

  it('should match phone', () => {
    const { enzymeWrapper } = setup();
    const input = enzymeWrapper.find('input');
    input.simulate('change', { target: { value: 'phone'} });
    expect(enzymeWrapper.state().filteredData).toEqual([
      { description: 'Super phone', name: 'Motorola' },
      { description: 'Samsung', name: 'Mobile phone' }
    ]);
  });
});
