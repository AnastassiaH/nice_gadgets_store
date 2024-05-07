import { ProductDetailed } from '../types';
import { getData } from '../utils/httpClient';

export function getTablets() {
  return getData<ProductDetailed[]>('/tablets.json');
}
