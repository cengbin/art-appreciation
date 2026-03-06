import React from 'react';
import {StoreInfoCardProps} from './types';
import './index.scss';

export const StoreInfoCard: React.FC<StoreInfoCardProps> = ({
  storeName,
  address,
  onLocationClick,
  onPhoneClick,
}) => {
  return (
    <div className="store-info-card">
      <div className="store-info">
        <div className="store-name">
          <span className="name">{storeName}</span>
          <span className="arrow">›</span>
        </div>
        <div className="address">{address}</div>
      </div>
      <div className="actions">
        <button className="icon-button" onClick={onLocationClick}>
          📍
        </button>
        <div className="divider"/>
        <button className="icon-button" onClick={onPhoneClick}>
          📞
        </button>
      </div>
    </div>
  );
};
