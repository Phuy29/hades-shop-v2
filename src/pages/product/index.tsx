import { useGetProduct } from 'api/product/getProduct';
import { Button } from 'components/Button';
import { Link, useParams } from 'react-router-dom';
import { Params } from 'types/base';

const Product = () => {
  const params = useParams<Params>();

  const productQuery = useGetProduct(params.productSlug as string);

  if (!productQuery.data) return null;

  return (
    <div className="px-14 mt-24">
      <div className="flex justify-center gap-24" key={productQuery.data._id}>
        <div className="h-[650px] overflow-y-auto">
          <img src={productQuery.data.imgUrl} alt="" className="w-[600px]" />
        </div>

        <div className="p-5 mt-8">
          <h3 className="my-5 text-36 font-medium">{productQuery.data.name}</h3>
          <p className="my-3">{productQuery.data.price},000₫</p>
          <div className="my-4">
            <p>Màu sắc:</p>
            <div className="inline-flex gap-2 my-2">
              {productQuery.data.colors?.map((color) => {
                return (
                  <div key={color} className="">
                    <input type="radio" name="color" value={color} id={color} className="sr-only" />
                    <label htmlFor={color}>{color}</label>
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
            {productQuery.data.sizes?.map((item) => {
              return (
                <div key={item} className="group flex-initial w-24">
                  <input
                    type="radio"
                    key={item}
                    name="size"
                    id={item}
                    value={item}
                    className="sr-only"
                  />
                  <label
                    htmlFor={item}
                    className="inline-block w-full py-4 text-center text-base border border-black shadow-sm cursor-pointer group-checked:bg-black">
                    <span>{item}</span>
                  </label>
                </div>
              );
            })}
          </div>

          <Button variant="outline" size="lg" className="w-full my-4">
            Thêm vào giỏ hàng
          </Button>

          <Link to="/cart">
            <Button size="lg" className="w-full">
              Mua ngay
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
