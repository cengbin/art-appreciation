import React, {useState, useMemo, useEffect} from 'react';
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
  // 获取当前 URL 参数
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [displayedCount, setDisplayedCount] = useState<number>(100);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const categories: Category[] = photos.categories || [];
  const allImages: Photo[] = photos.images?.all || [];

  /**
   * 当分类改变时，同步更新 URL 参数
   * 便于分享链接和浏览器历史记录
   */
  useEffect(() => {
    const url = new URL(window.location.href);

    if (selectedCategory === 'all') {
      // 如果是全部分类，移除 category 参数
      url.searchParams.delete('category');
    } else {
      // 否则设置 category 参数
      url.searchParams.set('category', selectedCategory);
    }

    // 更新 URL 但不触发页面刷新
    const newUrl = url.toString();
    if (newUrl !== window.location.href) {
      window.history.replaceState({}, '', newUrl);
    }
  }, [selectedCategory]);

  const categoryImages = useMemo(() => {
    if (selectedCategory === 'all') {
      return allImages;
    }
    return allImages.filter(img => img.category === selectedCategory);
  }, [selectedCategory, allImages]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setDisplayedCount(100); // 切换分类时重置显示数量
  };

  // 滚动加载更多数据
  useEffect(() => {
    const handleScroll = () => {
      if (isLoading) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 当滚动到距离底部 200px 时触发加载
      if (scrollTop + windowHeight >= documentHeight - 200) {
        loadMoreImages();
      }
    };

    const loadMoreImages = () => {
      if (isLoading) return;

      if (displayedCount >= categoryImages.length) return;

      setIsLoading(true);

      // 模拟异步加载延迟
      setTimeout(() => {
        setDisplayedCount(prev => Math.min(prev + 100, categoryImages.length));
        setIsLoading(false);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedCategory, displayedCount, isLoading, categoryImages]);

  // 重置显示数量当分类改变时
  useEffect(() => {
    setDisplayedCount(100);
  }, [selectedCategory]);

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
          {categoryImages.length > 0 ? (
            categoryImages.slice(0, displayedCount).map((photo, index) => (
              <div key={photo.url} className="image-item" data-index={index}>
                <LazyImage
                  src={`http://localhost:8082/2%E4%B8%87%E5%BC%A0ins%E9%9D%92%E6%98%A5%E5%8A%A8%E4%BA%BA%E7%BE%8E%E5%A5%B3%E5%A3%81%E7%BA%B8%E7%BE%8E%E5%9B%BE%E5%90%88%E9%9B%86/${photo.url}`}
                  alt={photo.filename}
                  className="image-item-img"
                  onError={() => {
                    console.warn(`Failed to load image: ${photo.filename}`);
                  }}
                />
              </div>
            ))
          ) : (
            <div className="no-images">
              <p>该分类下暂无图片</p>
            </div>
          )}

          {/* 加载状态 */}
          {isLoading && displayedCount < categoryImages.length && (
            <div className="loading-more">
              <p>加载更多图片...</p>
            </div>
          )}

          {/* 显示已加载数量 */}
          {!isLoading && displayedCount < categoryImages.length && (
            <div className="load-info">
              <p>已加载 {displayedCount} / {categoryImages.length} 张图片</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagesPage;
