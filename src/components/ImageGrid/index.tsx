import React from 'react';
import ImageCard from '../ImageCard';
import './index.scss';

interface Photo {
  filename: string;
  url: string;
  category: string;
}

interface ImageGridProps {
  images: Photo[];
  emptyText?: string;
  onImageClick: (index: number) => void;
  imageUrlPrefix: string;
  onImageError?: (filename: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  emptyText = '暂无图片',
  onImageClick,
  imageUrlPrefix,
  onImageError
}) => {
  if (images.length === 0) {
    return (
      <div className="image-grid">
        <div className="image-grid__empty">
          <p>{emptyText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="image-grid">
      {images.map((photo, index) => {
        const fullImageUrl = `${imageUrlPrefix}${photo.url}`;
        return (
          <ImageCard
            key={photo.url}
            photo={photo}
            index={index}
            imageUrl={fullImageUrl}
            onClick={onImageClick}
            onImageError={onImageError}
          />
        );
      })}
    </div>
  );
};

export default ImageGrid;
