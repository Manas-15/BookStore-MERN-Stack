import { NavItem } from 'types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Overview',
    url: '/dashboard/overview',
    icon: 'layout-dashboard',
    isActive: false,
    //shortcut: [''],
    items: []
  },

  {
    title: 'Provident Fund',
    url: '#',
    icon: 'landmark',
    isActive: false,
    //shortcut: [''],
    items: [
      {
        title: 'Bank Advice',
        url: '/dashboard/provident-fund/bank-advice',
        icon: 'credit-card'
        //shortcut: ['']
      }
    ]
  }
];
export const settingsNavItems: NavItem[] = [
  {
    title: 'Security Master',
    url: '#',
    icon: 'key-round',
    isActive: false,
    //shortcut: [''],
    items: [
      {
        title: 'Exchange',
        url: '/settings/security-master/exchange',
        icon: 'handshake'
        //shortcut: ['']
      }
    ]
  }
];
