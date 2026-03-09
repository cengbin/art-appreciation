import {lazy} from 'react';
import {Navigate, RouteObject} from 'react-router-dom';

const Images = lazy(() => import('../pages/Images'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/images" replace/>,
  },
  {
    path: '/images',
    element: <Images/>,
  },
];

export default routes;
