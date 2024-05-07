import { Product } from '../types';
import { getData } from '../utils/httpClient';

function getProducts() {
  return getData<Product[]>('/products.json');
}

export const fetchProducts = async () => {
  const data = await getProducts();

  if (data && data?.length) {
    return data as Product[];
  }

  return new Error();
};
