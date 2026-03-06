import React from 'react';
import {HeaderProps} from './types.ts';
import './index.scss';

export const Header: React.FC<HeaderProps> = ({title, onBack}) => {
  return (
    <div className="header">
      <div className="navigationBar">
        {onBack && (
          <button className="backButton" onClick={onBack}>
            ‹
          </button>
        )}
        <div className="title">{title}</div>
        <button className="moreButton">⋯</button>
      </div>
    </div>
  );
};
