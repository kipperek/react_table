import Fuse from 'fuse.js';

function filterCreator<DataType>(
  keys: Array<(keyof DataType)>,
  data:DataType[],
  shouldSort:boolean = true,
  threshold:number = 0.1,
  location:number = 0,
  distance:number = 1000) {

  const options: Fuse.FuseOptions<DataType> = {
    shouldSort,threshold,location,distance,keys
  };

  const fuse = new Fuse(data, options);

  return (searchText: string):DataType[] => {
    searchText = searchText.replace(/^\s+|\s+$/g,'');
    return searchText ? fuse.search(searchText) : data;
  };
};

export default {
  filterCreator
}
