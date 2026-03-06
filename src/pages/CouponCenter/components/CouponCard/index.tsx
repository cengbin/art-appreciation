import React from 'react';
import { CouponCardProps } from './types';
import './index.scss';

export const CouponCard: React.FC<CouponCardProps> = ({
  amount,
  title,
  condition,
  expireDate,
  claimed,
  onClaim,
}) => {
  return (
    <div className="coupon-card">
      <div className="left-section">
        <div className="amount">
          <span className="currency">￥</span>
          {amount}
        </div>
        <div className="condition">{condition}</div>
      </div>
      <div className="right-section">
        <div className="coupon-info">
          <div className="title">{title}</div>
          <div className="expire-date">有效期至：{expireDate}</div>
        </div>
        <button
          className={`claim-button ${claimed ? 'claimed' : ''}`}
          onClick={onClaim}
          disabled={claimed}
        >
          {claimed ? '已领取' : '立即领取'}
        </button>
      </div>
    </div>
  );
};
