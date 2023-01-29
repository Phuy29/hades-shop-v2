import React from 'react';

const Home = React.lazy(() => import('pages/home'));
const Product = React.lazy(() => import('pages/product'));
const Collection = React.lazy(() => import('pages/collection'));
const Cart = React.lazy(() => import('pages/cart'));
const Login = React.lazy(() => import('pages/Login'));
const Register = React.lazy(() => import('pages/Register'));

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
