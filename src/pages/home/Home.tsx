import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="bg-[url(https://theme.hstatic.net/1000306633/1000859591/14/slideshow_3.jpg?v=329)] bg-cover bg-no-repeat bg-bottom h-[854px] relative top-0 right-0 left-0 "></section>
      <section className="p-2 w-full flex justify-between gap-x-2">
        <Link to="/collections/top">
          <img
            src="https://theme.hstatic.net/1000306633/1000859591/14/block_home_category1_new.png?v=329"
            alt=""
          />
        </Link>
        <Link to="/collections/bottom">
          <img
            src="https://theme.hstatic.net/1000306633/1000859591/14/block_home_category2_new.png?v=329"
            alt=""
          />
        </Link>
        <Link to="/collections/outerwear">
          <img
            src="https://theme.hstatic.net/1000306633/1000859591/14/block_home_category3_new.png?v=329"
            alt=""
          />
        </Link>
      </section>

      <section className="px-14">Here is product list</section>

      <section>
        <img
          src="https://theme.hstatic.net/1000306633/1000859591/14/show_block_home_category_image_3_new.png?v=329"
          alt=""
        />
      </section>
    </>
  );
};

export default Home;
