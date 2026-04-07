import { useState, useEffect, useRef, forwardRef } from 'react';
import type { ThumbnailItemProps } from '../types';

const ThumbnailItem = forwardRef<HTMLDivElement, ThumbnailItemProps>(
  ({ image, index, isActive, size, onClick }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin: '50px' }
      );

      if (itemRef.current) {
        observer.observe(itemRef.current);
      }

      return () => observer.disconnect();
    }, []);

    const handleClick = () => {
      onClick(index);
    };

    return (
      <div
        ref={(node) => {
          itemRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={`viewer-thumbnail-item ${isActive ? 'active' : ''}`}
        style={{ width: size, height: size }}
        onClick={handleClick}
      >
        {isVisible && (
          <>
            {!isLoaded && (
              <div className="viewer-thumbnail-loading">
                <span>{index + 1}</span>
              </div>
            )}
            <img
              src={image.src}
              alt={image.alt || `Thumbnail ${index + 1}`}
              onLoad={() => setIsLoaded(true)}
              style={{ opacity: isLoaded ? 1 : 0 }}
            />
          </>
        )}
      </div>
    );
  }
);

ThumbnailItem.displayName = 'ThumbnailItem';

export default ThumbnailItem;
