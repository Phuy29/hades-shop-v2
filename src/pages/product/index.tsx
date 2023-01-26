import { useGetProduct } from 'api/product/getProduct';
import { Button } from 'components/Button';
import { Cart } from 'contexts/SlideCartContext/type';
import { useSlideCart } from 'hooks/useSlideCart';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Params } from 'types/base';
import { Product } from 'types/product';
import { classNames } from 'utils/className';

type ProductMainProps = {
  product: Product;
};

const ProductMain = ({ product }: ProductMainProps) => {
  const [colorState, setColorState] = useState(product.colors[0]);
  const [sizeState, setSizeState] = useState(product.sizes[0]);
  const { addCartItem, open } = useSlideCart();

  const handleProductToCart = (product: Product) => {
    const cartItem: Cart = {
      id: product._id,
      price: Number(product.price),
      imgUrl: product.imgUrl,
      name: product.name,
      slug: product.slug,
      color: colorState,
      size: sizeState
    };

    addCartItem(cartItem);
    open();
  };

  console.log('productPage');
  console.log('colorState', colorState);
  console.log('sizeState', sizeState);

  return (
    <div className="flex justify-center gap-24" key={product._id}>
      <div className="h-[650px] overflow-y-auto">
        <img src={product.imgUrl} alt="" className="w-[600px]" />
      </div>

      <div className="p-5 mt-8">
        <h3 className="my-5 text-36 font-medium">{product.name}</h3>
        <p className="my-3">{product.price},000₫</p>
        <div className="my-4">
          <p>Màu sắc:</p>
          <div className="inline-flex gap-2 my-2">
            {product.colors?.map((color) => {
              return (
                <div key={color} className="">
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    id={color}
                    className="sr-only"
                    onChange={() => setColorState(color)}
                  />
                  <label
                    htmlFor={color}
                    className={classNames(color === colorState ? 'bg-black text-white' : '')}>
                    {color}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <p>Kích thước:</p>
          <p className="font-thin underline text-12 cursor-pointer">Bảng size:</p>
        </div>

        <div className="flex flex-wrap my-5">
          {product.sizes?.map((size) => {
            return (
              <div key={size} className="flex-initial w-24">
                <input
                  type="radio"
                  key={size}
                  name="size"
                  id={size}
                  value={size}
                  className="sr-only"
                  onChange={() => setSizeState(size)}
                />
                <label
                  htmlFor={size}
                  className={classNames(
                    size === sizeState ? 'bg-black text-white' : '',
                    'inline-block w-full py-4 text-center text-base border border-black shadow-sm cursor-pointer'
                  )}>
                  <span>{size}</span>
                </label>
              </div>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="lg"
          className="w-full my-4"
          onClick={() => handleProductToCart(product)}>
          Thêm vào giỏ hàng
        </Button>

        <Link to="/cart">
          <Button size="lg" className="w-full">
            Mua ngay
          </Button>
        </Link>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const params = useParams<Params>();
  const productQuery = useGetProduct(params.productSlug as string);

  if (!productQuery.data) return null;

  return (
    <div className="px-14 mt-24">
      <ProductMain product={productQuery.data} />
    </div>
  );
};

export default ProductPage;
