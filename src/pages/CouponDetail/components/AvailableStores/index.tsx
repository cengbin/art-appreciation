import React from 'react';
import {AvailableStoresProps} from './types';
import './index.scss';

export const AvailableStores: React.FC<AvailableStoresProps> = ({distance, onClick}) => {
  return (
    <div className="availableStores" onClick={onClick}>
      <div className="title">可用门店</div>
      <div className="storeLink">
        <span className="distance">{distance}</span>
        <span className="arrow">›</span>
      </div>
    </div>
  );
};
