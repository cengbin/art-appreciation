import React from 'react';
import LazyImage from '../../../../components/LazyImage';
import './index.scss';

interface Photo {
  filename: string;
  url: string;
  category: string;
}

interface ImageCardProps {
  photo: Photo;
  index: number;
  imageUrl: string;
  onClick: (index: number) => void;
  onImageError?: (filename: string) => void;
}

const getImageTitle = (filename: string): string => {
  const formattedName = filename.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim();
  return formattedName || 'Untitled';
};

const ImageCard: React.FC<ImageCardProps> = ({
  photo,
  index,
  imageUrl,
  onClick,
  onImageError
}) => {
  const handleClick = () => {
    onClick(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(index);
    }
  };

  const handleError = () => {
    if (onImageError) {
      onImageError(photo.filename);
    }
  };

  return (
    <div
      className="image-card"
      data-index={index}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <LazyImage
        src={imageUrl}
        alt={photo.filename}
        className="image-card__img"
        onError={handleError}
      />

      <div className="image-card__overlay">
        <span className="image-card__category">{photo.category}</span>
        <h3 className="image-card__title">{getImageTitle(photo.filename)}</h3>
      </div>
    </div>
  );
};

export default ImageCard;
