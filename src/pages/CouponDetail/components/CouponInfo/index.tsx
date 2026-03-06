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
    <div className="couponInfo">
      <div className="category">{category}</div>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="actions">
        <button className="useButton" onClick={onUse}>
          立即使用
        </button>
        <button className="shareButton" onClick={onShare}>
          🔗
        </button>
      </div>
      <div className="validPeriod">可用时间：{validPeriod}</div>
    </div>
  );
};
