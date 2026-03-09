import {lazy} from 'react';
import {RouteObject} from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const Images = lazy(() => import('../pages/Images'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/images',
    element: <Images/>,
  },
];

export default routes;
