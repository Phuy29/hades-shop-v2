import { useGetCollection } from 'api/collection/getCollection';
import { Button } from 'components/Button';
import { Cart } from 'contexts/SlideCartContext/type';
import { useSlideCart } from 'hooks/useSlideCart';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Params } from 'types/base';
import { Product } from 'types/product';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Spinner } from 'components/Loading';

type Option = { label: string; value: OptionValue };

enum OptionValue {
  PRICE_LOW_TO_HIGH,
  PRICE_HIGH_TO_LOW,
  OLDEST,
  LATEST
}

const options: Option[] = [
  { label: 'PRICE LOW TO HIGH', value: OptionValue.PRICE_LOW_TO_HIGH },
  { label: 'PRICE HIGH TO LOW', value: OptionValue.PRICE_HIGH_TO_LOW },
  { label: 'OLDEST', value: OptionValue.OLDEST },
  { label: 'LATEST', value: OptionValue.LATEST }
];

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
  const { open, addCartItem } = useSlideCart();

  const handleAddProductToCart = useCallback(() => {
    const product: Cart = {
      id,
      slug,
      imgUrl: imageUrl,
      name,
      color: colors[0],
      size: sizes[0],
      price: Number(price),
      cartQuantity: 1
    };

    addCartItem(product);
    open();
  }, []);

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
          <Button className="basis-1/2" onClick={handleAddProductToCart}>
            Add to card
          </Button>
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

type ProductListProps = {
  products: Product[];
  selected: Option;
};

const ProductList = ({ products, selected }: ProductListProps) => {
  const filteredProducts = useMemo(() => {
    switch (selected.value) {
      case OptionValue.PRICE_LOW_TO_HIGH:
        return products.sort((a, b) => Number(a.price) - Number(b.price));
      case OptionValue.PRICE_HIGH_TO_LOW:
        return products.sort((a, b) => Number(b.price) - Number(a.price));
      case OptionValue.LATEST:
        return products.sort((a, b) => {
          const createAtA = new Date(a.createdAt).getTime();
          const createAtB = new Date(b.createdAt).getTime();
          return createAtB - createAtA;
        });
      case OptionValue.OLDEST:
        return products.sort((a, b) => {
          const createAtA = new Date(a.createdAt).getTime();
          const createAtB = new Date(b.createdAt).getTime();
          return createAtA - createAtB;
        });
      default:
        return products;
    }
  }, [selected, products]);

  return (
    <div className="mt-10 grid grid-cols-4 grid-rows-2 gap-y-8 gap-x-4">
      {filteredProducts.map((item) => {
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
    </div>
  );
};

type FilterBarProps = {
  selected: Option;
  setSelected: React.Dispatch<React.SetStateAction<Option>>;
};

const FilterBar = ({ selected, setSelected }: FilterBarProps) => {
  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1 z-10 w-52 ml-auto mr-0">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
            <span className="block truncate">{selected.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-200' : 'text-gray-900'
                    }`
                  }
                  value={option}>
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

const Collection = () => {
  const params = useParams<Params>();
  const collectionQuery = useGetCollection(params.collectionSlug as string);
  const [selected, setSelected] = useState(options[0]);

  if (collectionQuery.isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size={'lg'} />
      </div>
    );

  if (!collectionQuery.data) return null;

  return (
    <div className="px-14 mt-24">
      <section className="mt-24 my-20 ">
        <FilterBar selected={selected} setSelected={setSelected} />
        <ProductList products={collectionQuery.data.products} selected={selected} />
      </section>
    </div>
  );
};

export default Collection;
