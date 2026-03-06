export type HeaderTheme = 'light' | 'dark' | 'gradient' | 'custom';
export type HeaderPosition = 'fixed' | 'sticky' | 'relative';

export interface HeaderProps {
  title?: string;
  theme?: HeaderTheme;
  position?: HeaderPosition;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  
  showBack?: boolean;
  backIcon?: React.ReactNode;
  onBack?: () => void;
  leftContent?: React.ReactNode;
  
  showMore?: boolean;
  moreIcon?: React.ReactNode;
  onMore?: () => void;
  rightContent?: React.ReactNode;
  
  centerContent?: React.ReactNode;
  
  backgroundColor?: string;
  textColor?: string;
  
  safeArea?: boolean;
  bordered?: boolean;
  shadow?: boolean;
}
