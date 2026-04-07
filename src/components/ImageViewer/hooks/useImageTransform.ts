import { useState, useCallback } from 'react';
import type { TransformState } from '../types';

const SCALE_STEP = 0.2;
const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const ROTATION_STEP = 90;

export const useImageTransform = () => {
  const [transform, setTransform] = useState<TransformState>({
    scale: 1,
    rotation: 0,
    position: { x: 0, y: 0 },
  });

  const handleZoomIn = useCallback(() => {
    setTransform(prev => ({
      ...prev,
      scale: Math.min(prev.scale + SCALE_STEP, MAX_SCALE),
    }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(prev.scale - SCALE_STEP, MIN_SCALE),
    }));
  }, []);

  const handleRotate = useCallback(() => {
    setTransform(prev => ({
      ...prev,
      rotation: (prev.rotation + ROTATION_STEP) % 360,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setTransform({
      scale: 1,
      rotation: 0,
      position: { x: 0, y: 0 },
    });
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
    setTransform(prev => ({
      ...prev,
      scale: Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev.scale + delta)),
    }));
  }, []);

  const setPosition = useCallback((position: { x: number; y: number }) => {
    setTransform(prev => ({
      ...prev,
      position,
    }));
  }, []);

  const resetTransform = useCallback(() => {
    setTransform({
      scale: 1,
      rotation: 0,
      position: { x: 0, y: 0 },
    });
  }, []);

  return {
    transform,
    handleZoomIn,
    handleZoomOut,
    handleRotate,
    handleReset,
    handleWheel,
    setPosition,
    resetTransform,
  };
};
