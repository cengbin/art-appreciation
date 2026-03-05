import { RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import CouponCenter from '../pages/CouponCenter';
import CouponDetail from '../pages/CouponDetail';

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
