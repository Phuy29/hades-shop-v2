import { useGetProducts } from 'api/product/getProducts';
import { useDebounce } from 'hooks/useDebounce';
import { useSlideSearch } from 'hooks/useSlideSearch';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { Slide } from './Slide';

type SearchBarProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ searchText, setSearchText }: SearchBarProps) => {
  return (
    <>
      <input
        type="text"
        placeholder="Search in Hades ..."
        className="uppercase w-full shadow-sm p-5 bg-gray-200 focus:bg-gray-100 placeholder:text-gray-600 placeholder:uppercase border-none outline-none block border-gray-300"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText && (
        <button className="absolute top-5 right-4 text-gray-400" onClick={() => setSearchText('')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </>
  );
};

type FilterdProductProps = {
  products: Product[];
  searchText: string;
};

const FilteredProducts = ({ products, searchText }: FilterdProductProps) => {
  const debounceSearchText = useDebounce(searchText.toLowerCase(), 500);

  const filteredProduct = useMemo(() => {
    if (!searchText) return [];

    return products.filter((product) => product.name.toLowerCase().includes(debounceSearchText));
  }, [debounceSearchText]);

  return (
    <>
      <div>
        {filteredProduct.map((item) => {
          return (
            <Link to={`/product/${item.slug}`} key={item._id} onClick={() => close()}>
              <div className="flex justify-between items-center text-14 border-b border-gray-100 pt-2 pb-5">
                <div>
                  <p>{item.name}</p>
                  <p>{item.price}.000₫</p>
                </div>
                <div>
                  <img src={item.imgUrl} alt="" className="w-11" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export const SlideSearch = () => {
  const productsQuery = useGetProducts();
  const { shoulOpen, close } = useSlideSearch();
  const [searchText, setSearchText] = useState('');

  if (!productsQuery.data) return null;

  return (
    <Slide isOpen={shoulOpen} title="Search" onClose={close}>
      <div className="relative mt-16">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />

        <FilteredProducts products={productsQuery.data} searchText={searchText} />
      </div>
    </Slide>
  );
};
