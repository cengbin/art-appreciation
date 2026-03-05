import React from 'react';
import './index.scss';

interface Coupon {
  id: number;
  amount: number;
  title: string;
  condition: string;
  expiry: string;
  received: boolean;
}

const CouponCenter: React.FC = () => {
  const coupons: Coupon[] = [
    {
      id: 1,
      amount: 9,
      title: '高露洁多点券',
      condition: '满300元可用',
      expiry: '有效期至：2020.7.7 00:00',
      received: false
    },
    {
      id: 2,
      amount: 9,
      title: '高露洁多点券',
      condition: '满300元可用',
      expiry: '有效期至：2020.7.7 00:00',
      received: false
    },
    {
      id: 3,
      amount: 9,
      title: '高露洁多点券',
      condition: '满300元可用',
      expiry: '有效期至：2020.7.7 00:00',
      received: false
    }
  ];

  const handleReceive = (couponId: number): void => {
    console.log('领取优惠券:', couponId);
  };

  return (
    <div className="coupon-center">
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
          <button className="back-btn">←</button>
          <h1 className="title">领券中心</h1>
          <div className="actions">
            <button className="more-btn">⋯</button>
            <button className="search-btn">🔍</button>
          </div>
        </div>
      </div>

      {/* 店铺信息 */}
      <div className="store-info">
        <div className="store-details">
          <div className="store-name">
            <span>西顿国际店</span>
            <span className="arrow">›</span>
          </div>
          <p className="store-note">可与整单换购、优惠券叠加使用</p>
        </div>
        <div className="store-actions">
          <button className="location-btn">📍</button>
          <div className="divider"></div>
          <button className="phone-btn">📞</button>
        </div>
      </div>

      {/* 优惠券列表 */}
      <div className="coupon-list">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="coupon-card">
            <div className="coupon-left">
              <div className="coupon-amount">
                <span className="currency">¥</span>
                <span className="value">{coupon.amount}</span>
              </div>
              <div className="coupon-condition">{coupon.condition}</div>
            </div>
            <div className="coupon-divider"></div>
            <div className="coupon-right">
              <div className="coupon-info">
                <h3 className="coupon-title">{coupon.title}</h3>
                <p className="coupon-expiry">{coupon.expiry}</p>
              </div>
              <button 
                className="receive-btn"
                onClick={() => handleReceive(coupon.id)}
              >
                立即领取
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 底部 */}
      <div className="footer">
        <p>DMALL FIT提供技术服务</p>
      </div>
    </div>
  );
};

export default CouponCenter;
