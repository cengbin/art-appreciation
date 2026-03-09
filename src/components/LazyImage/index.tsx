import React, { useState, useRef, useEffect } from 'react';
import './index.scss';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * 懒加载图片组件
 * 
 * 核心功能：
 * 1. 使用 Intersection Observer API 监听图片是否进入可视区域
 * 2. 只有当图片滚动到可视区域时才开始加载
 * 3. 提供骨架屏加载效果和占位符
 * 4. 支持图片加载失败处理
 * 
 * 性能优化：
 * - 减少初始页面加载时间
 * - 节省带宽，只加载用户实际看到的图片
 * - 设置预加载边距，提前开始加载
 * - 自动清理观察器，避免内存泄漏
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholder = '/placeholder.jpg',
  onLoad,
  onError
}) => {
  // 图片是否已加载完成
  const [isLoaded, setIsLoaded] = useState(false);
  // 图片是否在可视区域内
  const [isInView, setIsInView] = useState(false);
  // 图片加载是否失败
  const [hasError, setHasError] = useState(false);
  
  // 图片元素引用
  const imgRef = useRef<HTMLImageElement>(null);
  // 容器元素引用，用于 Intersection Observer
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * 核心：设置 Intersection Observer 监听可视区域变化
   * 
   * Intersection Observer API 提供了一种异步观察目标元素与祖先元素或顶级文档视口的交叉状态的方法。
   * 当图片进入可视区域时，触发回调函数开始加载图片。
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 当目标元素进入可视区域时
          if (entry.isIntersecting) {
            setIsInView(true);
            // 加载后立即停止观察，避免重复触发
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // 阈值：目标元素有 10% 进入可视区域时触发
        threshold: 0.1,
        // 根边距：在可视区域外 50px 就开始预加载，提升用户体验
        rootMargin: '50px'
      }
    );

    // 开始观察容器元素
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 清理函数：组件卸载时停止观察，避免内存泄漏
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []); // 空依赖数组，只在组件挂载时执行一次

  /**
   * 图片加载成功回调
   * 更新加载状态，触发外部回调
   */
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  /**
   * 图片加载失败回调
   * 更新错误状态，触发外部回调
   */
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div ref={containerRef} className={`lazy-image-container ${className}`}>
      {/* 
        核心：只有当图片在可视区域内时才渲染 img 标签
        这样可以避免浏览器提前加载不在可视区域的图片
      */}
      {isInView && (
        <img
          ref={imgRef}
          // 加载失败时显示占位图
          src={hasError ? placeholder : src}
          alt={alt}
          // 根据加载状态添加不同的 CSS 类名
          className={`lazy-image ${isLoaded ? 'loaded' : 'loading'} ${hasError ? 'error' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          // 原生懒加载属性，作为双重保险
          loading="lazy"
        />
      )}
      
      {/* 
        骨架屏：图片正在加载且未出错时显示
        提供视觉反馈，让用户知道图片正在加载
      */}
      {!isLoaded && isInView && !hasError && (
        <div className="image-skeleton">
          <div className="skeleton-shimmer"></div>
        </div>
      )}
      
      {/* 
        占位符：图片不在可视区域时显示
        提示用户这里有图片内容
      */}
      {!isInView && (
        <div className="image-placeholder">
          <div className="placeholder-icon">📷</div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
