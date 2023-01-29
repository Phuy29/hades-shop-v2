import React, { Fragment } from 'react';
import { useScroll } from 'hooks/useScroll';
import { classNames } from 'utils/className';
import { Link } from 'react-router-dom';
import { useSlideCart } from 'hooks/useSlideCart';
import { useSlideSearch } from 'hooks/useSlideSearch';
import { useAuth } from '../hooks/useAuth';
import { Menu, Transition } from '@headlessui/react';
import { useMutation } from 'react-query';
import { logout } from '../api/auth/logout';
import { storage } from '../utils/storage';

const adminNavigation = [
  { name: 'Products', href: '/admin/products' },
  { name: 'Collections', href: '/admin/collections' },
  { name: 'Users', href: '/admin/users' }
];

const userNavigation = [{ name: 'Profile', href: '/' }];

interface LayoutDefaultProps {
  children: React.ReactNode;
}

export const LayoutDefault = ({ children }: LayoutDefaultProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

const Header = () => {
  const shouldScroll = useScroll();

  return (
    <header
      className={classNames(
        shouldScroll ? 'bg-white' : '',
        'px-14 w-full fixed top-0 z-10 transition-all duration-300'
      )}>
      <div className="flex items-center justify-between h-[66px]">
        <div className="flex justify-between items-center gap-4">
          <Link to="/">
            <img
              src="https://theme.hstatic.net/1000306633/1000859591/14/logo.png?v=314"
              alt="logo"
              className="h-[50px] pr-8"
            />
          </Link>

          <MenuBar />
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

const MenuBar = () => {
  return (
    <nav className="flex gap-5">
      {menu.map((item, index) => {
        return (
          <Link to={`/collection/${item.slug}`} key={index}>
            <span className="hover:before:block hover:before:absolute hover:before:-inset-1 hover:before:-skew-y-3 hover:before:bg-[url(https://file.hstatic.net/1000306633/file/269858510_400978881784237_2773069039765727977_n_1dec697e894b44028881c14c6507f7d8.png)] before:bg-no-repeat before:bg-contain relative uppercase font-normal text-xs">
              <span className="relative">{item.name}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

const UserNavigation = () => {
  const { open: openSlideCart, state } = useSlideCart();
  const { open: openSlideSearch } = useSlideSearch();
  const { authData } = useAuth();

  return (
    <>
      <div className="flex items-center gap-5 text-xs justify-end uppercase">
        {authData?.user ? (
          <>
            <ProfileDropdown />
          </>
        ) : (
          <div>
            <Link to={'/login'}>
              <span className="cursor-pointer">Login</span> /
            </Link>
            <Link to={'/register'}>
              <span className="cursor-pointer">Register</span>
            </Link>
          </div>
        )}

        <div className="cursor-pointer" onClick={() => openSlideSearch()}>
          Search
        </div>
        <div className="cursor-pointer" onClick={() => openSlideCart()}>
          CART ({state.totalQuantity})
        </div>
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

const ProfileDropdown = () => {
  const { authData, setAuthData } = useAuth();

  const { mutate: logoutUser } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      setAuthData(null);
      storage.removeToken();
    }
  });

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="uppercase">
          <span>Hi, {authData?.user?.username}</span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {authData?.user?.isAdmin
            ? adminNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      to={item.href}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}>
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))
            : userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      to={item.href}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}>
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}

          <Menu.Item>
            {({ active }) => (
              <div
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-3 text-sm text-gray-700 border-t cursor-pointer'
                )}
                onClick={() => logoutUser()}>
                Logout
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
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
