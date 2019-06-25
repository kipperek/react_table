import { IConfig } from '../components/MyTable/Types';

export interface IProduct {
  name: string;
  description: string;
};

export const ProductsTable: Array<IConfig<IProduct>> = [{
    model: "name",
    name: 'Name'
  },
  {
    model: "description",
    name: 'Description'
  }
];

const products: IProduct[] = [
  {
    "name": "Phone",
    "description": "phone and camera in one.",
  }, {
    "name": "Tv",
    "description": "1080p",
  }, {
    "name": "Computer mouse",
    "description": "2 special buttons on the left",
  }, {
    "name": "Extra Computer mouse",
    "description": "12 special buttons on the left",
  }
];

// api mock, would use 'axios' to call api
type ResolveType = (value: IProduct[]) => void;
const getProducts = (): Promise<IProduct[]> => {
  const api = (resolve: ResolveType) => {
    setTimeout(()=>{
      resolve(products);
    }, 500)
    // reject -> when error
  }
  return new Promise(api);
}

export default {
  getProducts
}
