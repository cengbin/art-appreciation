export interface ViewerImage {
  src: string;
  alt?: string;
}

export interface ImageViewerProps {
  visible: boolean;
  onClose: () => void;
  images: ViewerImage[];
  activeIndex?: number;
  zIndex?: number;
  scalable?: boolean;
  rotatable?: boolean;
  noNavbar?: boolean;
  noToolbar?: boolean;
  className?: string;
  showThumbnails?: boolean;
  thumbnailSize?: number;
}

export interface TransformState {
  scale: number;
  rotation: number;
  position: { x: number; y: number };
}

export interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
}

export interface ViewerThumbnailsProps {
  images: ViewerImage[];
  currentIndex: number;
  onThumbnailClick: (index: number) => void;
  thumbnailSize?: number;
}

export interface ThumbnailItemProps {
  image: ViewerImage;
  index: number;
  isActive: boolean;
  size: number;
  onClick: (index: number) => void;
}
