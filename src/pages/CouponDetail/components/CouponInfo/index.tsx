import React from 'react';
import {CouponInfoProps} from './types';
import './index.scss';

export const CouponInfo: React.FC<CouponInfoProps> = ({
  category,
  title,
  description,
  validPeriod,
  onUse,
  onShare,
}) => {
  return (
    <div className="coupon-info">
      <div className="category">{category}</div>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="actions">
        <button className="use-button" onClick={onUse}>
          立即使用
        </button>
        <button className="share-button" onClick={onShare}>
          🔗
        </button>
      </div>
      <div className="valid-period">可用时间：{validPeriod}</div>
    </div>
  );
};
