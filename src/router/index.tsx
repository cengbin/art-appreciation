import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CouponCenter from '../pages/CouponCenter';
import CouponDetail from '../pages/CouponDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coupon-center" element={<CouponCenter />} />
      <Route path="/coupon-detail" element={<CouponDetail />} />
    </Routes>
  );
};

export default AppRoutes;
