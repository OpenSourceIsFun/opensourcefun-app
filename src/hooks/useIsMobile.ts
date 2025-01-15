import { useWithWidth } from '@/hooks/useWithWidth';

export const useIsMobile = () => {
  const width = useWithWidth();

  return width ? width <= 991 : null;
};
