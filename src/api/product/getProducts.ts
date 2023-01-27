import { axiosIntanse } from 'lib/axios';
import { useQuery } from 'react-query';
import { Product } from 'types/product';

const getProducts = (): Promise<Product[]> => {
  return axiosIntanse.get('/product');
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts()
  });
};
