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
    <div className="storeInfoCard">
      <div className="storeInfo">
        <div className="storeName">
          <span className="name">{storeName}</span>
          <span className="arrow">›</span>
        </div>
        <div className="address">{address}</div>
      </div>
      <div className="actions">
        <button className="iconButton" onClick={onLocationClick}>
          📍
        </button>
        <div className="divider"/>
        <button className="iconButton" onClick={onPhoneClick}>
          📞
        </button>
      </div>
    </div>
  );
};
