import { axiosIntanse } from 'lib/axios';
import { useQuery } from 'react-query';
import { Collection } from 'types/collection';

export const getCollection = (collectionSlug: string): Promise<Collection> => {
  return axiosIntanse.get(`/collection/${collectionSlug}`);
};

export const useGetCollection = (collectionSlug: string) => {
  return useQuery({
    queryKey: ['collection', collectionSlug],
    queryFn: () => getCollection(collectionSlug)
  });
};
