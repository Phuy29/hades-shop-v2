import React from 'react';

const Home = React.lazy(() => import('pages/home/Home'));
const Product = React.lazy(() => import('pages/product/Product'));
const Collection = React.lazy(() => import('pages/collection/Collection'));
const Cart = React.lazy(() => import('pages/cart/Cart'));
const Login = React.lazy(() => import('pages/login/Login'));
const Register = React.lazy(() => import('pages/register/Register'));

interface IPublicRoute {
  path: string;
  component: React.ReactNode;
}

export const publicRoutes: IPublicRoute[] = [
  {
    path: '/',
    component: <Home />
  },
  {
    path: '/product/:productSlug',
    component: <Product />
  },
  {
    path: '/collection/:collectionSlug',
    component: <Collection />
  },
  {
    path: '/cart',
    component: <Cart />
  },
  {
    path: '/login',
    component: <Login />
  },
  {
    path: '/register',
    component: <Register />
  }
];
