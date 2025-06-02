import { useMemo } from 'react';

export function useIsTouchDevice() {
  return useMemo(() => {
    if (typeof window === 'undefined') return false;

    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }, []);
}
