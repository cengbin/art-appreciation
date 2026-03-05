import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import Loading from '../components/Loading';

const Router = () => {
  const element = useRoutes(routes);
  return <Suspense fallback={<Loading />}>{element}</Suspense>;
};

export default Router;
