import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from 'components/Button';
import { useSlideCart } from 'hooks/useSlideCart';
import { Link } from 'react-router-dom';
import { formatPriceDot } from 'utils/formatPrice';
import { Slide } from './Slide';

export const SlideCart = () => {
  const { shouldOpen, close, state, removeCartItem } = useSlideCart();

  return (
    <Slide title="Cart" isOpen={shouldOpen} onClose={close}>
      {state.carts.length === 0 ? (
        <div className="mt-8">
          <div className="mt-16 text-14">There are currently no products</div>
          <div className="w-full border-t-2 border-black mt-4"></div>
          <div className="flex justify-between mt-6">
            <div className="uppercase text-14">Total</div>
            <div>0đ</div>
          </div>
          <div className="mt-7">
            <Link to="/cart">
              <Button onClick={() => close()}>View Cart</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {state.carts.map((item, index) => {
                return (
                  <li key={index}>
                    <div className="flex gap-3 my-4">
                      <Link to={`/product/${item.slug}`} onClick={() => close()}>
                        <img
                          src={item.imgUrl}
                          alt=""
                          className="h-[118px] w-52 border border-slate-300"
                        />
                      </Link>
                      <div className="w-[300px] ml-3">
                        <p>{item.name}</p>
                        <p className="mt-7 mb-3 font-normal text-gray-400">
                          {item.color} / {item.size}
                        </p>
                        <span className="py-1 px-3 text-12 bg-gray-200">{item.cartQuantity}</span>
                        <span className="ml-3 font-normal text-gray-600">{item.price}.000₫</span>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="px-2 mt-1 mr-5"
                          onClick={() => removeCartItem(item)}>
                          <XMarkIcon className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="w-full border-t-2 border-black mt-10"></div>
            <div className="flex justify-between mt-6">
              <div className="uppercase text-14">Total</div>
              <div>
                {state.totalPrice === 0 ? '0đ' : `${formatPriceDot(state.totalPrice)}.000₫`}
              </div>
            </div>
            <Link to="/cart">
              <div className="mt-7" onClick={() => close()}>
                <Button>View cart</Button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </Slide>
  );
};
