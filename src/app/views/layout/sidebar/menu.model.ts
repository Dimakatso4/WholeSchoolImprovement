
export interface MenuItem {
  id?: number;
  label?: string;
  icon?: string;
  link?: string;
  expanded?: boolean;
  subItems?: any;
  isTitle?: boolean;
  isLabel?: boolean;
  badge?: any;
  parentId?: number;
  role?: string;  
  username?: string;
}
