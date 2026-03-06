import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Header} from '../../components/Header';
import {CouponInfo} from './components/CouponInfo';
import {UsageRules} from './components/UsageRules';
import {AvailableStores} from './components/AvailableStores';
import './index.scss';

const CouponDetail: React.FC = () => {
  const navigate = useNavigate();

  const handleUse = () => {
    console.log('立即使用优惠券');
  };

  const handleShare = () => {
    console.log('送给好友');
  };

  const handleStoreList = () => {
    console.log('查看可用门店');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="couponDetail">
      <Header title="优惠券" onBack={handleBack}/>

      <CouponInfo
        category="优惠券类型"
        title="优惠券名称"
        description="这里是优惠券使用门槛"
        validPeriod="2022.10.01~2022.10.10"
        onUse={handleUse}
        onShare={handleShare}
      />

      <UsageRules
        rules={[
          '订单金额满100元可用',
          '可用时间：2022.12.05~2022.12.30',
          '限奶爸便利店微信小程序下单使用',
          '限门店自提下单使用',
        ]}
        contactInfo="联系商家"
      />

      <AvailableStores distance="附近400米可用" onClick={handleStoreList}/>
    </div>
  );
};

export default CouponDetail;
