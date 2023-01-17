import { axiosIntanse } from 'lib/axios';
import { useQuery } from 'react-query';
import { Product } from 'types/product';

const getProduct = (productSlug: string): Promise<Product> => {
  return axiosIntanse.get(`/product/${productSlug}`);
};

export const useGetProduct = (productSlug: string) => {
  return useQuery({
    queryKey: ['product', productSlug],
    queryFn: () => getProduct(productSlug)
  });
};
