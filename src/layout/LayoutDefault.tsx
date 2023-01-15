import React, { useEffect, useState } from 'react';

interface LayoutDefaultProps {
  children: React.ReactNode;
}

export const LayoutDefault = ({ children }: LayoutDefaultProps) => {
  return (
    <div className="h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

const Header = () => {
  const [isBg, setIsBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsBg(true) : setIsBg(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`px-14 w-full ${isBg && 'bg-white'} transition-all duration-300`}>
      <div className="flex items-center justify-between h-[66px]">
        <div className="flex justify-between items-center gap-4">
          <img
            src="https://theme.hstatic.net/1000306633/1000859591/14/logo.png?v=314"
            alt="logo"
            className="h-[50px] pr-8"
          />

          <Menu />
        </div>

        <UserNavigation />
      </div>
    </header>
  );
};

interface IMenu {
  slug: string;
  name: string;
}

const menu: IMenu[] = [
  {
    slug: 'tops',
    name: 'tops'
  },
  {
    slug: 'bottoms',
    name: 'bottoms'
  },
  {
    slug: 'outerwear',
    name: 'outerwear'
  },
  {
    slug: 'footwear',
    name: 'footwear'
  },
  {
    slug: 'hat',
    name: 'hat'
  },
  {
    slug: 'bags',
    name: 'bags'
  }
];

const Menu = () => {
  return (
    <nav className="flex gap-5">
      {menu.map((item, index) => {
        return (
          <div key={index}>
            <span className="hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-[url(https://file.hstatic.net/1000306633/file/269858510_400978881784237_2773069039765727977_n_1dec697e894b44028881c14c6507f7d8.png)] before:bg-no-repeat before:bg-contain relative uppercase font-normal text-xs">
              <span className="relative">{item.name}</span>
            </span>
          </div>
        );
      })}
    </nav>
  );
};

const UserNavigation = () => {
  return (
    <>
      <div className="flex items-center gap-5 text-xs justify-end uppercase">
        <div>
          <span className="cursor-pointer">Login</span> /
          <span className="cursor-pointer">Register</span>
        </div>

        <div className="cursor-pointer">Search</div>
        <div className="cursor-pointer">CART</div>
        <div className="flex uppercase bg-black p-1 text-white items-center">
          EN
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="flex justify-between gap-x-4 mx-24 my-14">
        <div className="">
          <div className="text-20 uppercase font-semibold mt-3">HADES STORE SYSTEM</div>
          <div className="text-12 font-light mt-5 flex flex-col gap-3">
            <p>Hades FLAGSHIP STORE: 69 QUANG TRUNG STREET, GO VAP DISTRICT, HOCHIMINH.</p>
            <p>Store 2: 26 LY TU TRONG STREET, DISTRICT 1, HOCHIMINH (THE NEW PLAYROUND).</p>
            <p>
              Store 3: 350 DIEN BIEN PHU STREET, WARD 7, BINH THANH DISTRICT, HOCHIMINH (G-TOWN).
            </p>
            <p>Store 4: 4 PHAM NGU LAO STREET, DISTRICT 1, HOCHIMINH.</p>
            <p>Store 5: 136 NGUYEN HONG DAO STREET, TAN BINH DISTRICT, HOCHIMINH.</p>
            <p>Store 6: VINCOM SHOPHOUSE, BIEN HOA.</p>
            <p>Store 7: FLOOR 7 - BLOCK B2 - VINCOM BA TRIEU, HANOI.</p>
          </div>
        </div>

        <div>
          <div className="text-13 uppercase font-semibold mt-3">POLICY</div>
          <div className="text-12 font-light mt-5 flex flex-col gap-3">
            <p>- Website usage policy</p>
            <p>- Payment Options</p>
            <p>- Returns & Exchanges</p>
            <p>- Shipping Services</p>
            <p>- Terms of Service</p>
            <p>- Shopping Guide</p>
            <p>- Privacy Policy</p>
          </div>
        </div>

        <div>
          <div className="text-13 uppercase font-semibold mt-3">CONTACT INFO</div>
          <div className="text-12 font-light mt-5 flex flex-col gap-3">
            <p>- HADES COMPANY LIMITED Add: 45 Phan Chu Trinh, Ben Thanh, Q1, Ho Chi Minh City</p>
            <p>- Hotline: 02873011021 (10h -18h)</p>
            <p>- Date granted: 20/07/2020</p>
            <p>- Recruitment: hr@hades.vn</p>
            <p>- Website: hades.vn</p>
            <p>- Customer care: support@hades.vn</p>
            <p>- For business: contact@hades.vny</p>
          </div>
        </div>

        <div>
          <div className="text-13 uppercase font-semibold mt-3">FOLLOW US ON SOCIAL MEDIA</div>
          <div className="mt-6 opacity-80"></div>
        </div>
      </div>
    </footer>
  );
};
