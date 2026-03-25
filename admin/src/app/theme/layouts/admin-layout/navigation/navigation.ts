export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  /*
  {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'login',
        title: 'Login',
        type: 'item',
        classes: 'nav-item',
        url: '/login',
        icon: 'login',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'register',
        title: 'Register',
        type: 'item',
        classes: 'nav-item',
        url: '/register',
        icon: 'profile',
        target: true,
        breadcrumbs: false
      }
    ]
  },*/
  {
    id: 'utilities',
    title: 'Components',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'orders',
        title: 'Orders',
        type: 'item',
        classes: 'nav-item',
        url: '/order-management',
        icon: 'shopping-cart'
      },
      {
        id: 'products',
        title: 'Products',
        type: 'item',
        classes: 'nav-item',
        url: '/product-management',
        icon: 'box-plot'
      },
      {
        id: 'customers',
        title: 'Customers',
        type: 'item',
        classes: 'nav-item',
        url: '/customer-management',
        icon: 'user'
      },
      {
        id: 'categories',
        title: 'Categories',
        type: 'item',
        classes: 'nav-item',
        url: '/categorie-management',
        icon: 'tags'
      },
      {
        id: 'sub-categories',
        title: 'Sub Categories',
        type: 'item',
        classes: 'nav-item',
        url: '/sub-categorie-management',
        icon: 'tags'
      }
    ]
  },

  {
    id: 'media',
    title: 'Media',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'images',
        title: 'Images',
        type: 'item',
        classes: 'nav-item',
        url: '/image-management',
        icon: 'picture'
      },
      {
        id: 'stories',
        title: 'Stories',
        type: 'item',
        classes: 'nav-item',
        url: '/storie-management',
        icon: 'video-camera'
      },
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'chrome'
      },
    ]
  }
];
