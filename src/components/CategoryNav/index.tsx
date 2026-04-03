import React, { useRef, useEffect, useState } from 'react';
import CategoryModal from '../CategoryModal';
import './index.scss';

interface Category {
  name: string;
  count: number;
  id: string;
}

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 点击分类时滚动到中间
  const scrollToCenter = (categoryId: string) => {
    if (!navRef.current || !trackRef.current) return;

    const button = trackRef.current.querySelector(`[data-category-id="${categoryId}"]`) as HTMLElement;
    if (!button) return;

    const navWidth = navRef.current.offsetWidth;
    const buttonLeft = button.offsetLeft;
    const buttonWidth = button.offsetWidth;

    // 计算滚动位置，使按钮居中
    const scrollLeft = buttonLeft - (navWidth / 2) + (buttonWidth / 2);
    
    navRef.current.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  // 当选中分类改变时，自动滚动到中间
  useEffect(() => {
    scrollToCenter(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId);
    scrollToCenter(categoryId);
  };

  const handleMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalCategorySelect = (categoryId: string) => {
    onCategoryChange(categoryId);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="category-nav">
        <div className="category-nav__scroll" ref={navRef}>
          <div className="category-nav__track" ref={trackRef}>
            <button
              type="button"
              data-category-id="all"
              className={`category-nav__btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              All
            </button>
            {categories.map(category => (
              <button
                type="button"
                key={category.id}
                data-category-id={category.id}
                className={`category-nav__btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <button
          type="button"
          className="category-nav__more-btn"
          onClick={handleMoreClick}
          aria-label="查看更多分类"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="10" r="1.5" fill="currentColor"/>
            <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
            <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        categories={categories}
        selectedCategory={selectedCategory}
        onClose={handleModalClose}
        onCategorySelect={handleModalCategorySelect}
      />
    </>
  );
};

export default CategoryNav;
