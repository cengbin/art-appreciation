import React from 'react';
import CategoryNav from '../CategoryNav';
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

        <CategoryNav
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </div>
  );
};

export default GalleryHeader;
