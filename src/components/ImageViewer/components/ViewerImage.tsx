import React, { useState } from 'react';
import type { ViewerImage as ViewerImageType } from '../types';

interface ViewerImageProps {
  image: ViewerImageType;
  transform: {
    scale: number;
    rotation: number;
    position: { x: number; y: number };
  };
}

const ViewerImage: React.FC<ViewerImageProps> = ({ image, transform }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const imageStyle: React.CSSProperties = {
    transform: `
      translate(${transform.position.x}px, ${transform.position.y}px)
      scale(${transform.scale})
      rotate(${transform.rotation}deg)
    `,
    userSelect: 'none',
    transition: 'transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s',
  };

  return (
    <>
      {isLoading && <div className="image-viewer-loading">加载中...</div>}
      {hasError && <div className="image-viewer-error">图片加载失败</div>}
      {!hasError && (
        <img
          src={image.src}
          alt={image.alt || ''}
          className="image-viewer-image"
          style={imageStyle}
          onLoad={handleLoad}
          onError={handleError}
          draggable={false}
        />
      )}
    </>
  );
};

export default ViewerImage;
