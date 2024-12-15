import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems1 = [
  { key: 'customers', title: 'Analytics', href: paths.dashboard.customers, icon: 'chart-pie' },
  // { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  // { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  // { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];

export const sideBarItems = [
  { key: 'overview', title: 'Sample Title', href: paths.dashboard.overview, icon: 'search' },
] satisfies NavItemConfig[];

export const navItems2 = [
  { key: 'overview', title: 'Search Page', href: paths.dashboard.overview, icon: 'search' },
  // { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  // { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  // { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
