import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

interface CouponInfo {
  category: string;
  title: string;
  description: string;
  validPeriod: string;
}

const CouponDetail: React.FC = () => {
  const navigate = useNavigate();

  const couponInfo: CouponInfo = {
    category: '优惠券类型',
    title: '优惠券名称',
    description: '这里是优惠券使用门槛',
    validPeriod: '可用时间：2022.10.01~2022.10.10'
  };

  const usageRules = [
    '订单金额满100元可用',
    '可用时间：2022.12.05~2022.12.30',
    '限奶爸便利店微信小程序下单使用',
    '限门店自提下单使用'
  ];

  const handleUse = () => {
    console.log('立即使用优惠券');
  };

  const handleShare = () => {
    console.log('送给好友');
  };

  const handleStoreList = () => {
    console.log('查看可用门店');
  };

  return (
    <div className="coupon-detail">
      {/* 头部 */}
      <div className="header">
        <div className="status-bar">
          <span className="time">11:39</span>
          <div className="status-icons">
            <span className="signal">📶</span>
            <span className="wifi">📡</span>
            <span className="battery">🔋</span>
          </div>
        </div>
        <div className="title-bar">
          <button className="back-btn" onClick={() => navigate(-1)}>←</button>
          <h1 className="title">优惠券</h1>
          <div className="actions">
            <button className="more-btn">⋯</button>
            <button className="search-btn">🔍</button>
          </div>
        </div>
      </div>

      {/* 优惠券信息卡片 */}
      <div className="coupon-info-card">
        <p className="coupon-category">{couponInfo.category}</p>
        <h2 className="coupon-title">{couponInfo.title}</h2>
        <p className="coupon-description">{couponInfo.description}</p>
        
        <div className="coupon-actions">
          <button className="use-btn" onClick={handleUse}>
            立即使用
          </button>
          <button className="share-btn" onClick={handleShare}>
            <span className="share-icon">📤</span>
          </button>
        </div>
        
        <p className="valid-period">{couponInfo.validPeriod}</p>
      </div>

      {/* 使用须知 */}
      <div className="usage-rules">
        <h3 className="section-title">使用须知</h3>
        <div className="rules-list">
          {usageRules.map((rule, index) => (
            <p key={index} className="rule-item">
              {index + 1}、{rule}
            </p>
          ))}
        </div>
        <p className="contact-info">
          如有疑问，可<span className="contact-link">联系商家</span>
        </p>
      </div>

      {/* 可用门店 */}
      <div className="available-stores">
        <div className="store-header" onClick={handleStoreList}>
          <span className="store-title">可用门店</span>
          <div className="store-info">
            <span className="store-distance">附近400米可用</span>
            <span className="arrow">›</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponDetail;
