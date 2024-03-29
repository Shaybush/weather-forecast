interface sideBarModel {
  icon: number,
  label: string,
  route: string;
}

export const sideBarConfig: sideBarModel[] = [
  {
    icon: 0,
    label: 'Weather',
    route: '/'
  },
  {
    icon: 1,
    label: 'Favorites',
    route: '/favorites'
  },
  {
    icon: 2,
    label: 'Settings',
    route: '/settings'
  },
];