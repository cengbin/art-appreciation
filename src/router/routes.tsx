import {lazy} from 'react';
import {RouteObject} from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const CouponCenter = lazy(() => import('../pages/CouponCenter'));
const CouponDetail = lazy(() => import('../pages/CouponDetail'));
const Images = lazy(() => import('../pages/Images'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/coupon-center',
    element: <CouponCenter/>,
  },
  {
    path: '/coupon-detail',
    element: <CouponDetail/>,
  },
  {
    path: '/images',
    element: <Images/>,
  },
];

export default routes;
