
export interface IConfig<DataType> {
  model: keyof DataType;
  name: string;
};

export interface IPropsTable<DataType> {
  data: DataType[];
  config: Array<IConfig<DataType>>;
};

export interface IPropsWithSearch<DataType> extends IPropsTable<DataType> {
  searchPlaceholder?: string;
  noDataInfo?: string;
};

export interface IStateWithSearch<DataType> {
  searchText: string;
  data: DataType[];
  filteredData: DataType[];
};
