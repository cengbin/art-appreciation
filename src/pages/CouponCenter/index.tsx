import React, {useState} from 'react';
import {Header} from '../../components/Header';
import {StoreInfoCard} from './components/StoreInfoCard';
import {CouponCard} from './components/CouponCard';
import {Coupon} from './types';
import './index.scss';

const CouponCenter: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: '1',
      amount: 6,
      title: '高露洁多点券',
      condition: '满300元可用',
      expireDate: '2020.7.7 00:00',
      claimed: false,
    },
    {
      id: '2',
      amount: 6,
      title: '高露洁多点券',
      condition: '满300元可用',
      expireDate: '2021年12月23日前可用',
      claimed: false,
    },
    {
      id: '3',
      amount: 6,
      title: '高露洁多点券',
      condition: '满300元可用',
      expireDate: '2021年12月23日前可用',
      claimed: false,
    },
  ]);

  const handleClaim = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((coupon) =>
        coupon.id === couponId ? {...coupon, claimed: true} : coupon
      )
    );
  };


  const handleLocationClick = () => {
    console.log('定位');
  };

  const handlePhoneClick = () => {
    console.log('拨打电话');
  };

  return (
    <div className="coupon-center">
      <Header title="领券中心"/>

      <StoreInfoCard
        storeName="西顿国际店"
        address="距您388m｜北京市海淀区中关村大"
        onLocationClick={handleLocationClick}
        onPhoneClick={handlePhoneClick}
      />

      <div className="coupon-list">
        {coupons.map((coupon) => (
          <CouponCard
            key={coupon.id}
            amount={coupon.amount}
            title={coupon.title}
            condition={coupon.condition}
            expireDate={coupon.expireDate}
            claimed={coupon.claimed}
            onClaim={() => handleClaim(coupon.id)}
          />
        ))}
      </div>

      <div className="footer">
        <p>DMALL FIT提供技术服务</p>
      </div>
    </div>
  );
};

export default CouponCenter;
