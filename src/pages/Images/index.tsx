import React, { useState, useMemo } from 'react';
import './index.scss';
import photos from './2024-photos.json';
import LazyImage from '../../components/LazyImage';

interface Photo {
  filename: string;
  url: string;
  category: string;
  size: number;
  ext: string;
}

interface Category {
  name: string;
  count: number;
  id: string;
}

const ImagesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories: Category[] = photos.categories || [];
  const allImages: Photo[] = photos.images?.all || [];
  
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') {
      return allImages;
    }
    return allImages.filter(img => img.category === selectedCategory);
  }, [selectedCategory, allImages]);
  
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  
  return (
    <div className="images-page">
      <div className="container">
        {/* 分类导航 */}
        <div className="categories-nav">
          <button 
            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('all')}
          >
            全部图片 ({allImages.length})
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
        
        {/* 图片网格 */}
        <div className="images-grid">
          {filteredImages.length > 0 ? (
            filteredImages.map((photo, index) => (
              <div key={index} className="image-item">
                <LazyImage 
                  src={`http://localhost:8082/2%E4%B8%87%E5%BC%A0ins%E9%9D%92%E6%98%A5%E5%8A%A8%E4%BA%BA%E7%BE%8E%E5%A5%B3%E5%A3%81%E7%BA%B8%E7%BE%8E%E5%9B%BE%E5%90%88%E9%9B%86/${photo.url}`}
                  alt={photo.filename}
                  className="image-item-img"
                  onError={() => {
                    console.warn(`Failed to load image: ${photo.filename}`);
                  }}
                />
                <div className="image-info">
                  <p className="filename">{photo.filename}</p>
                  <p className="category">{photo.category}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-images">
              <p>该分类下暂无图片</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagesPage;
