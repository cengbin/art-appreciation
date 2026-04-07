import React from 'react';

interface ViewerToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
  onReset: () => void;
  scalable?: boolean;
  rotatable?: boolean;
}

const ViewerToolbar: React.FC<ViewerToolbarProps> = ({
  onZoomIn,
  onZoomOut,
  onRotate,
  onReset,
  scalable = true,
  rotatable = true,
}) => {
  return (
    <div className="image-viewer-toolbar">
      {scalable && (
        <>
          <button
            className="image-viewer-toolbar-button"
            onClick={onZoomIn}
            title="放大"
          >
            +
          </button>
          <button
            className="image-viewer-toolbar-button"
            onClick={onZoomOut}
            title="缩小"
          >
            −
          </button>
        </>
      )}
      {rotatable && (
        <button
          className="image-viewer-toolbar-button"
          onClick={onRotate}
          title="旋转"
        >
          ↻
        </button>
      )}
      <button
        className="image-viewer-toolbar-button"
        onClick={onReset}
        title="重置"
      >
        ⟲
      </button>
    </div>
  );
};

export default ViewerToolbar;
