import React from 'react';
import {useNavigate} from "react-router-dom";
import {HeaderProps} from './types.ts';
import './index.scss';

export const Header: React.FC<HeaderProps> = ({title, onBack}) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="navigationBar">
        <button className="backButton" onClick={() => {
          onBack ? onBack?.() : navigate(-1);
        }}>
          ‹
        </button>
        <div className="title">{title}</div>
        <button className="moreButton">⋯</button>
      </div>
    </div>
  );
};
