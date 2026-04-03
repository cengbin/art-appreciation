import React from 'react';
import './index.scss';

interface Category {
  name: string;
  count: number;
  id: string;
}

interface GalleryHeaderProps {
  title: string;
  subtitle: string;
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  title,
  subtitle,
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="gallery-header">
      <div className="gallery-header__inner">
        <div className="gallery-header__brand">
          <h1 className="gallery-header__title">{title}</h1>
          <p className="gallery-header__subtitle">{subtitle}</p>
        </div>

        <div className="gallery-header__nav">
          <div className="gallery-header__nav-track">
            <button
              type="button"
              className={`gallery-header__category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => onCategoryChange('all')}
            >
              All
            </button>
            {categories.map(category => (
              <button
                type="button"
                key={category.id}
                className={`gallery-header__category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => onCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryHeader;
