import React, { useEffect } from 'react';
import './index.scss';

interface Category {
  name: string;
  count: number;
  id: string;
}

interface CategoryModalProps {
  isOpen: boolean;
  categories: Category[];
  selectedCategory: string;
  onClose: () => void;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  categories,
  selectedCategory,
  onClose,
  onCategorySelect
}) => {
  // 按 ESC 键关闭弹窗
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
  };

  return (
    <div className="category-modal" onClick={handleBackdropClick}>
      <div className="category-modal__content">
        <div className="category-modal__header">
          <button
            type="button"
            className="category-modal__close"
            onClick={onClose}
            aria-label="关闭"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="category-modal__grid">
          {categories.map(category => (
            <button
              key={category.id}
              type="button"
              className={`category-modal__item ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
