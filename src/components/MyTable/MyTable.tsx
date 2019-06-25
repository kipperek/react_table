import * as React from 'react';
import { IConfig, IPropsTable } from './Types';

class MyTable<DataType> extends React.Component <IPropsTable<DataType>> {
  constructor (props:IPropsTable<DataType>) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  public render () {
    const { data, config } = this.props;

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {config.map(this.renderHeadColumns)}
          </tr>
        </thead>
        <tbody>
          {data.map(this.renderRow)}
        </tbody>
      </table>
    );
  }

  private renderBodyColumns (column: keyof DataType, item: DataType, index: number) {
    return <td key={index}>{item[column]}</td>
  }

  private renderHeadColumns (column: IConfig<DataType>, index: number) {
    return <th key={index}>{column.name}</th>
  }

  private renderRow (item: DataType, index: number) {
    const {config} = this.props;

    return (
      <tr key={index}>
        {config.map((column, columnIndex)=>
          this.renderBodyColumns(column.model, item, columnIndex))}
      </tr>
    )
  }
}

export default MyTable;
