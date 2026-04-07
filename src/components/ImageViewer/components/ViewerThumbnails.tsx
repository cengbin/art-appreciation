import { useRef, useEffect } from 'react';
import type { ViewerThumbnailsProps } from '../types';
import ThumbnailItem from './ThumbnailItem';

const ViewerThumbnails: React.FC<ViewerThumbnailsProps> = ({
  images,
  currentIndex,
  onThumbnailClick,
  thumbnailSize = 80,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeRef.current && containerRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);

  return (
    <div className="viewer-thumbnails" ref={containerRef}>
      <div className="viewer-thumbnails-list">
        {images.map((image, index) => (
          <ThumbnailItem
            key={index}
            image={image}
            index={index}
            isActive={index === currentIndex}
            size={thumbnailSize}
            onClick={onThumbnailClick}
            ref={index === currentIndex ? activeRef : null}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewerThumbnails;
