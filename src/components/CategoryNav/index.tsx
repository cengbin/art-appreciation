import React, {useRef, useEffect, useState} from 'react';
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
    if (!navRef.current) {
      return;
    }
    if (!trackRef.current) {
      return;
    }

    const button = trackRef.current.querySelector(`[data-category-id="${categoryId}"]`) as HTMLElement;
    if (!button) {
      return;
    }

    // 获取滚动容器和按钮的尺寸信息
    const navWidth = navRef.current.offsetWidth;
    const navScrollLeft = navRef.current.scrollLeft;

    // 使用 getBoundingClientRect 获取准确的相对位置
    // button.offsetLeft 会受到 track 的 offsetLeft 影响，导致计算错误
    // 正确做法：计算按钮相对于滚动容器的位置
    const scrollRect = navRef.current.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // 按钮左边界相对于滚动容器左边界的距离 + 当前已滚动的距离
    const buttonLeft = buttonRect.left - scrollRect.left + navScrollLeft;
    const buttonWidth = button.offsetWidth;

    // console.log('滚动容器宽度 (navWidth):', navWidth);
    // console.log('当前滚动位置 (navScrollLeft):', navScrollLeft);
    // console.log('按钮左侧偏移 (buttonLeft):', buttonLeft);
    // console.log('按钮宽度 (buttonWidth):', buttonWidth);
    // console.log('scrollRect.left:', scrollRect.left, 'buttonRect.left:', buttonRect.left);

    // 计算滚动位置，使按钮居中
    // 公式: 按钮左侧位置 - (容器宽度的一半) + (按钮宽度的一半)
    // 为什么是减号？因为我们要让按钮中心对齐到容器中心
    // 按钮中心位置 = buttonLeft + buttonWidth/2
    // 容器中心相对于滚动起点 = scrollLeft + navWidth/2
    // 要让两者相等: buttonLeft + buttonWidth/2 = scrollLeft + navWidth/2
    // 解方程得: scrollLeft = buttonLeft + buttonWidth/2 - navWidth/2
    const scrollLeft = buttonLeft - (navWidth / 2) + (buttonWidth / 2);

    // console.log('计算出的目标滚动位置 (scrollLeft):', scrollLeft);

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
    // 只调用 onCategoryChange，滚动会由 useEffect 自动触发
    onCategoryChange(categoryId);
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
