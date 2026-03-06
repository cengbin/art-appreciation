import React, { useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { HeaderProps } from './types.ts';
import './index.scss';

export const Header: React.FC<HeaderProps> = ({
  title,
  theme = 'gradient',
  position = 'relative',
  height = 88,
  className = '',
  style = {},
  
  showBack = true,
  backIcon,
  onBack,
  leftContent,
  
  showMore = false,
  moreIcon,
  onMore,
  rightContent,
  
  centerContent,
  
  backgroundColor,
  textColor,
  
  safeArea = false,
  bordered = false,
  shadow = false,
}) => {
  const navigate = useNavigate();

  const headerClasses = useMemo(() => {
    const classes = ['header'];
    classes.push(`header--${theme}`);
    classes.push(`header--${position}`);
    if (safeArea) classes.push('header--safe-area');
    if (bordered) classes.push('header--bordered');
    if (shadow) classes.push('header--shadow');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [theme, position, safeArea, bordered, shadow, className]);

  const headerStyle = useMemo(() => {
    const customStyle: React.CSSProperties = { ...style };
    if (height) {
      customStyle.height = typeof height === 'number' ? `${height}px` : height;
    }
    if (backgroundColor) {
      customStyle.backgroundColor = backgroundColor;
    }
    if (textColor) {
      customStyle.color = textColor;
    }
    return customStyle;
  }, [style, height, backgroundColor, textColor]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const renderLeft = () => {
    if (leftContent !== undefined) {
      return <div className="header__left">{leftContent}</div>;
    }
    
    if (showBack) {
      return (
        <div className="header__left">
          <button className="header__back-button" onClick={handleBack}>
            {backIcon || '‹'}
          </button>
        </div>
      );
    }
    
    return <div className="header__left" />;
  };

  const renderCenter = () => {
    if (centerContent !== undefined) {
      return <div className="header__center">{centerContent}</div>;
    }
    
    if (title) {
      return <div className="header__center"><div className="header__title">{title}</div></div>;
    }
    
    return <div className="header__center" />;
  };

  const renderRight = () => {
    if (rightContent !== undefined) {
      return <div className="header__right">{rightContent}</div>;
    }
    
    if (showMore) {
      return (
        <div className="header__right">
          <button className="header__more-button" onClick={onMore}>
            {moreIcon || '⋯'}
          </button>
        </div>
      );
    }
    
    return <div className="header__right" />;
  };

  return (
    <div className={headerClasses} style={headerStyle}>
      <div className="header__container">
        {renderLeft()}
        {renderCenter()}
        {renderRight()}
      </div>
    </div>
  );
};
