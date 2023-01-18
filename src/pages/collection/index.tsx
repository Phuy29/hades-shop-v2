import { useGetCollection } from 'api/collection/getCollection';
import { Button } from 'components/Button';
import { Link, useParams } from 'react-router-dom';
import { Params } from 'types/base';

type ProductCardProps = {
  id: string;
  name: string;
  slug: string;
  price: string;
  colors: string[];
  sizes: string[];
  imageUrl: string;
  imageHoverUrl: string;
};

const ProductCard = ({
  id,
  name,
  slug,
  price,
  colors,
  sizes,
  imageUrl,
  imageHoverUrl
}: ProductCardProps) => {
  return (
    <div className="text-center cursor-pointer">
      <div className="relative group h-full">
        <Link to={`/product/${slug}`}>
          <div className="group-hover:hidden">
            <img src={imageUrl} alt="" className="h-[400px] w-full object-cover" />
          </div>
          <div className="hidden group-hover:block">
            <img src={imageHoverUrl} alt="" className="h-[400px] w-full object-cover" />
          </div>
        </Link>
        <div className="flex gap-3 absolute bottom-2 w-full opacity-0 group-hover:opacity-100 transition-all ease-in duration-500 group-hover:animate-slideDown">
          <Link to="/cart" className="basis-1/2">
            <Button className="w-full">Buy now</Button>
          </Link>
          <Button className="basis-1/2">Add to card</Button>
        </div>
      </div>
      <div className="mt-[15px]">
        <p className="text-14 font-semibold">{name}</p>
        {price ? (
          <p className="text-14 mt-2">{price},000₫</p>
        ) : (
          <p className="mt-2 py-2 px-1 bg-gray-300 text-white font-semibold inline-block text-12">
            Hết hàng
          </p>
        )}
      </div>
    </div>
  );
};

const Collection = () => {
  const params = useParams<Params>();
  const collectionQuery = useGetCollection(params.collectionSlug as string);

  return (
    <div className="px-14 mt-24">
      <section className="mt-24 grid grid-cols-4 grid-rows-2 my-20 gap-y-8 gap-x-4">
        {collectionQuery.data?.products.map((item) => {
          return (
            <div key={item.name}>
              <ProductCard
                id={item._id}
                slug={item.slug}
                name={item.name}
                price={item.price}
                colors={item.colors}
                sizes={item.sizes}
                imageUrl={item.imgUrl}
                imageHoverUrl={item.imgUrlHover}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Collection;
