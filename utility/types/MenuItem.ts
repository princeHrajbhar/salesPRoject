export interface MenuItem {
  name: string;
  icon?: JSX.Element; // Make icon optional
  path: string;
  subMenu?: MenuItem[]; // Optional property for submenu items
}
