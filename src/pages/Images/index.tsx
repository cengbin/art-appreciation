import React, {useState, useMemo, useEffect, useCallback, useRef} from 'react';
import Viewer from 'react-viewer';
import './index.scss';
import photos from './photos.json';
import GalleryHeader from './components/GalleryHeader';
import ImageGrid from './components/ImageGrid';
import LoadingIndicator from './components/LoadingIndicator';

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

const COUNT = 50;
const IMAGE_BASE_URL = 'http://localhost:8082/2%E4%B8%87%E5%BC%A0ins%E9%9D%92%E6%98%A5%E5%8A%A8%E4%BA%BA%E7%BE%8E%E5%A5%B3%E5%A3%81%E7%BA%B8%E7%BE%8E%E5%9B%BE%E5%90%88%E9%9B%86/';

const ImagesPage: React.FC = () => {
  // 获取当前 URL 参数
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category') || 'all';

  const photosData = photos as any;

  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [displayedCount, setDisplayedCount] = useState<number>(COUNT);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewerVisible, setViewerVisible] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const categories: Category[] = photosData.categories || [];
  const allImages: Photo[] = photosData.images?.all || [];

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
    setDisplayedCount(COUNT); // 切换分类时重置显示数量
  };

  // 处理图片点击,打开查看器
  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    setViewerVisible(true);
  };

  // 准备图片数据供 react-viewer 使用
  const viewerImages = useMemo(() => {
    return categoryImages.slice(0, displayedCount).map(photo => ({
      src: `${IMAGE_BASE_URL}${photo.url}`,
      alt: photo.filename
    }));
  }, [categoryImages, displayedCount]);

  const displayedImages = useMemo(() => {
    return categoryImages.slice(0, displayedCount);
  }, [categoryImages, displayedCount]);

  const currentCategory = useMemo(() => {
    return categories.find(item => item.id === selectedCategory);
  }, [categories, selectedCategory]);

  const selectedCategoryLabel = currentCategory?.name || (selectedCategory === 'all' ? 'All Images' : selectedCategory);

  const emptyStateText = useMemo(() => {
    if (selectedCategory === 'all') {
      return '暂无图片';
    }

    return `${selectedCategoryLabel} 分类下暂无图片`;
  }, [selectedCategory, selectedCategoryLabel]);

  // 防止重复加载的标志
  const isLoadingRef = useRef<boolean>(false);

  // 使用 useCallback 优化 loadMoreImages 函数
  const loadMoreImages = useCallback(() => {
    console.log('触发加载更多图片数据 isLoadingRef=', isLoadingRef.current)
    if (isLoadingRef.current) return;

    if (displayedCount >= categoryImages.length) return;

    isLoadingRef.current = true;
    console.log('开始加载图片数据... isLoadingRef=', isLoadingRef.current);
    setIsLoading(true);

    // 模拟异步加载延迟
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + COUNT, categoryImages.length));
      setIsLoading(false);
      isLoadingRef.current = false;
      console.log('图片数据加载完成...')
    }, 1000);
  }, [displayedCount, categoryImages, COUNT]);

  // 滚动加载更多数据
  useEffect(() => {
    const handleScroll = () => {
      if (isLoadingRef.current) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 200) {
        console.log('滚动到页面底部.')
        loadMoreImages();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedCategory, loadMoreImages]);

  const handleImageError = (filename: string) => {
    console.warn(`Failed to load image: ${filename}`);
  };

  return (
    <div className="images-page">
      <GalleryHeader
        title="艺术欣赏"
        subtitle="探索精美艺术，发现视觉之美"
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryClick}
      />

      <div className="container">
        <ImageGrid
          images={displayedImages}
          emptyText={emptyStateText}
          onImageClick={handleImageClick}
          imageUrlPrefix={IMAGE_BASE_URL}
          onImageError={handleImageError}
        />

        <LoadingIndicator
          isLoading={isLoading}
          loadedCount={displayedCount}
          totalCount={categoryImages.length}
          hasItems={categoryImages.length > 0}
        />
      </div>

      {/* 图片查看器 */}
      <Viewer
        visible={viewerVisible}
        onClose={() => setViewerVisible(false)}
        images={viewerImages}
        activeIndex={activeIndex}
        zIndex={9999}
        scalable={true}
        rotatable={true}
        downloadable={false}
        noNavbar={false}
        noToolbar={false}
      />
    </div>
  );
};

export default ImagesPage;
