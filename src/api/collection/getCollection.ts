import { axiosIntanse } from 'lib/axios';
import { Collection } from 'types/collection';

export const getCollection = (collectionSlug: string): Promise<Collection> => {
  return axiosIntanse.get(`/collection/${collectionSlug}`);
};
