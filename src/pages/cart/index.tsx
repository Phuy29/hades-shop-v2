import { TrashIcon } from '@heroicons/react/24/outline';
import { useSlideCart } from 'hooks/useSlideCart';
import { Link } from 'react-router-dom';
import { formatPriceDot } from 'utils/formatPrice';

const Cart = () => {
  const { state, decreaseQuantity, increaseQuantity } = useSlideCart();

  return (
    <div className="mt-32">
      <div className="text-center text-36 font-medium">GIỎ HÀNG CỦA BẠN</div>
      <div className="flex justify-center gap-8 mt-6">
        <div className="px-5 py-3 w-[800px] bg-gray-100">
          <p>Bạn đang có {state.totalQuantity} sản phẩm trong giỏ hàng</p>
          {state.carts.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex gap-3 justify-between items-center py-2 pl-1 my-4 border-b bg-white">
                  <Link to={`/product/${item.slug}`}>
                    <img src={item.imgUrl} alt="" className="h-[112px] w-[100px] cursor-pointer" />
                  </Link>
                  <div className="inline-flex flex-col w-[30%] pl-5">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">
                      {item.color} / {item.size}
                    </p>
                  </div>
                  <div className="inline-flex w-1/5">
                    <div className="flex border border-gray-300">
                      <button
                        className="py-1 w-6 bg-gray-100 cursor-pointer text-center"
                        onClick={() => decreaseQuantity(item)}>
                        -
                      </button>
                      <p className="py-1 w-7 text-center text-12">{item.cartQuantity}</p>
                      <button
                        className="py-1 w-6 bg-gray-100 cursor-pointer text-center"
                        onClick={() => increaseQuantity(item)}>
                        +
                      </button>
                    </div>
                  </div>
                  <p className="inline-flex w-[15%] text-gray-400 text-16">{item.price}.000₫</p>
                  <div className="inline-flex w-[25%] flex-col items-center">
                    <p className="text-13 font-thin">Thành tiền:</p>
                    <span className="text-red-700">
                      {formatPriceDot(item.price * item.cartQuantity)}.000₫
                    </span>
                    <div className="mt-2 flex justify-center cursor-pointer">
                      <TrashIcon />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="py-5 px-3 border border-gray-300 h-min">
            <h3 className="font-medium text-20 pb-3 border-b border-gray-300">
              Thông tin đơn hàng
            </h3>
            <div className="flex justify-between gap-24 mt-4 pb-3 border-b border-gray-300">
              <p className="">Tổng tiền:</p>
              <p className="w-[80px]">
                {state.totalPrice === 0 ? '0đ' : `${formatPriceDot(state.totalPrice)}.000₫`}
              </p>
            </div>
            <div className="mt-2 py-3 w-full bg-black text-white font-semibold uppercase text-center cursor-pointer">
              Thanh toán
            </div>
          </div>
          <div className="mt-3 font-thin text-center cursor-pointer">Tiếp tục mua hàng →</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
