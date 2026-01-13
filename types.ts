export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  imageUrl: string;
}

export interface CursorState {
  active: boolean;
  text: string | null;
}

export type ThemeColor = 'void' | 'flash' | 'tech' | 'noktaBlue' | 'acid';