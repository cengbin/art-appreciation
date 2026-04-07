import React, { useState, useEffect } from 'react';
import './ImageViewer.scss';
import type { ImageViewerProps } from './types';
import ViewerImage from './components/ViewerImage';
import ViewerToolbar from './components/ViewerToolbar';
import ViewerThumbnails from './components/ViewerThumbnails';
import { useImageTransform } from './hooks/useImageTransform';
import { useDrag } from './hooks/useDrag';
import { useKeyboard } from './hooks/useKeyboard';

const ImageViewer: React.FC<ImageViewerProps> = ({
  visible,
  onClose,
  images,
  activeIndex = 0,
  zIndex = 9999,
  scalable = true,
  rotatable = true,
  noNavbar = false,
  noToolbar = false,
  className = '',
  showThumbnails = true,
  thumbnailSize = 70,
}) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [responsiveThumbnailSize, setResponsiveThumbnailSize] = useState(thumbnailSize);

  const {
    transform,
    handleZoomIn,
    handleZoomOut,
    handleRotate,
    handleReset,
    handleWheel,
    setPosition,
    resetTransform,
  } = useImageTransform();

  const { isDragging, handleMouseDown, handleMouseMove, handleMouseUp } = useDrag({
    onPositionChange: setPosition,
  });

  useEffect(() => {
    setCurrentIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  useEffect(() => {
    resetTransform();
  }, [currentIndex, resetTransform]);

  useEffect(() => {
    const updateThumbnailSize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setResponsiveThumbnailSize(50);
      } else if (width <= 768) {
        setResponsiveThumbnailSize(55);
      } else {
        setResponsiveThumbnailSize(thumbnailSize);
      }
    };

    updateThumbnailSize();
    window.addEventListener('resize', updateThumbnailSize);
    return () => window.removeEventListener('resize', updateThumbnailSize);
  }, [thumbnailSize]);

  useEffect(() => {
    if (!visible) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [visible, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (!visible) return;

    const canvas = document.querySelector('.image-viewer-canvas');
    if (!canvas) return;

    canvas.addEventListener('wheel', handleWheel as EventListener, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel as EventListener);
  }, [visible, handleWheel]);

  const handlePrev = () => {
    setCurrentIndex((prev: number) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev: number) => Math.min(images.length - 1, prev + 1));
  };

  useKeyboard({
    enabled: visible,
    onClose,
    onPrev: handlePrev,
    onNext: handleNext,
    onZoomIn: handleZoomIn,
    onZoomOut: handleZoomOut,
    onRotate: handleRotate,
  });

  if (!visible || images.length === 0) {
    return null;
  }

  const handleMaskClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const currentImage = images[currentIndex];

  return (
    <div
      className={`image-viewer ${className}`}
      style={{ zIndex }}
      onClick={handleMaskClick}
    >
      <div className="image-viewer-mask" />

      <div
        className={`image-viewer-canvas ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
      >
        {currentImage && (
          <ViewerImage
            image={currentImage}
            transform={transform}
          />
        )}
      </div>

      {/* 左侧导航按钮 */}
      {!noNavbar && images.length > 1 && (
        <button
          className="image-viewer-nav-button image-viewer-nav-prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          title="上一张"
        >
          ‹
        </button>
      )}

      {/* 右侧导航按钮 */}
      {!noNavbar && images.length > 1 && (
        <button
          className="image-viewer-nav-button image-viewer-nav-next"
          onClick={handleNext}
          disabled={currentIndex === images.length - 1}
          title="下一张"
        >
          ›
        </button>
      )}

      {/* 关闭按钮 - 右上角 */}
      <button
        className="image-viewer-close-button"
        onClick={onClose}
        title="关闭"
      >
        ×
      </button>

      {/* 图片计数器 - 在工具栏上方居中 */}
      {images.length > 1 && (
        <div className="image-viewer-counter">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* 工具栏 - 在缩略图上方居中 */}
      {!noToolbar && (
        <ViewerToolbar
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onRotate={handleRotate}
          onReset={handleReset}
          scalable={scalable}
          rotatable={rotatable}
        />
      )}

      {/* 缩略图 - 在最底部 */}
      {showThumbnails && images.length > 1 && (
        <ViewerThumbnails
          images={images}
          currentIndex={currentIndex}
          onThumbnailClick={setCurrentIndex}
          thumbnailSize={responsiveThumbnailSize}
        />
      )}
    </div>
  );
};

export default ImageViewer;
