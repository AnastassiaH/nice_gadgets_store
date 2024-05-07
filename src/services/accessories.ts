import { ProductDetailed } from '../types';
import { getData } from '../utils/httpClient';

export function getAccessories() {
  return getData<ProductDetailed[]>('/accessories.json');
}
