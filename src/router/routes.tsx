import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const CouponCenter = lazy(() => import('../pages/CouponCenter'));
const CouponDetail = lazy(() => import('../pages/CouponDetail'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/coupon-center',
    element: <CouponCenter />,
  },
  {
    path: '/coupon-detail',
    element: <CouponDetail />,
  },
];

export default routes;
