import * as React from 'react';

import SearchHelper from '../../helpers/SearchHelper';

import Table from './MyTable';
import { IPropsWithSearch, IStateWithSearch } from './Types';

class MyTable<DataType> extends React.Component <IPropsWithSearch<DataType>, IStateWithSearch<DataType>> {

  public static getDerivedStateFromProps<StaticDataType>
      (props: IPropsWithSearch<StaticDataType>, state: IStateWithSearch<StaticDataType>) {

    if (props.data !== state.data) {
      return {
        data: props.data
      };
    }

    return null;
  }

  private filterData: (searchText: string) => DataType[];

  constructor (props:IPropsWithSearch<DataType>) {
    super(props);

    const initSearchText = '';
    this.filterData = SearchHelper.filterCreator<DataType>(props.config.map((item)=>item.model), props.data);
    this.state = { searchText: initSearchText, filteredData: this.filterData(initSearchText), data:props.data };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  public componentDidUpdate (prevProps:IPropsWithSearch<DataType>) {
    const props = this.props;

    if (props.data !== prevProps.data) {
      const {searchText} = this.state;
      this.filterData = SearchHelper.filterCreator<DataType>(props.config.map((item)=>item.model), props.data);
      this.setState({ filteredData: this.filterData(searchText) })
    }
  }

  public render () {
    const { filteredData } = this.state;

    return (
      <div>
        {this.renderSearchInput()}
        {filteredData.length > 0 ?
           <Table data={filteredData} config={this.props.config}/> : this.renderNoDataInfo() }
      </div>
    );
  }

  private handleSearchChange (event: React.ChangeEvent<HTMLInputElement>) {
    const {value} = event.target;
    this.setState({searchText:value, filteredData: this.filterData(value)});
  }

  private renderNoDataInfo () {
    const { noDataInfo = 'There are no results for provided query.' } = this.props;
    return (
      <div>{noDataInfo}</div>
    )
  }

  private renderSearchInput () {
    const { searchPlaceholder = 'enter search text...' } = this.props;

    return (
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder={searchPlaceholder}
          value={this.state.searchText}
          onChange={this.handleSearchChange}/>
      </div>
    );
  }
}

export default MyTable;
