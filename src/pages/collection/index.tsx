import { getCollection } from 'api/collection/getCollection';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Params } from 'types/base';

const Collection = () => {
  const params = useParams<Params>();

  useEffect(() => {
    (async () => {
      const collectionData = await getCollection(params.collectionSlug as string);
      console.log('collectionData', collectionData);
    })();
  }, [params.collectionSlug]);

  return <div>Collection {params.collectionSlug}</div>;
};

export default Collection;
