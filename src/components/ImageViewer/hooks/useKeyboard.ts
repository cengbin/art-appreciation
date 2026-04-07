import { useEffect } from 'react';

interface UseKeyboardOptions {
  enabled: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotate: () => void;
}

export const useKeyboard = ({
  enabled,
  onClose,
  onPrev,
  onNext,
  onZoomIn,
  onZoomOut,
  onRotate,
}: UseKeyboardOptions) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case '+':
        case '=':
          onZoomIn();
          break;
        case '-':
          onZoomOut();
          break;
        case 'r':
        case 'R':
          onRotate();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, onClose, onPrev, onNext, onZoomIn, onZoomOut, onRotate]);
};
