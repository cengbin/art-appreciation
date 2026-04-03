import React from 'react';
import './index.scss';

interface LoadingIndicatorProps {
  isLoading: boolean;
  loadedCount: number;
  totalCount: number;
  hasItems: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  isLoading,
  loadedCount,
  totalCount,
  hasItems
}) => {
  // 正在加载更多
  if (isLoading && loadedCount < totalCount) {
    return (
      <div className="loading-indicator loading-indicator--loading">
        <p>正在加载更多图片...</p>
      </div>
    );
  }

  // 已加载全部
  if (!isLoading && loadedCount >= totalCount && hasItems) {
    return (
      <div className="loading-indicator loading-indicator--complete">
        <p>已加载全部 {totalCount} 张图片</p>
      </div>
    );
  }

  // 显示加载进度
  if (!isLoading && loadedCount < totalCount) {
    return (
      <div className="loading-indicator loading-indicator--info">
        <p>已加载 {loadedCount} / {totalCount} 张图片</p>
      </div>
    );
  }

  return null;
};

export default LoadingIndicator;
