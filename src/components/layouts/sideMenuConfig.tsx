import {
  Bolt,
  BookOpen,
  Building,
  CalendarDays,
  HomeIcon,
  LayoutTemplate,
  Settings,
  ShieldCheck,
  SquareGanttChart,
  SquareUserRound,
  Store,
  Tags,
  User,
} from "lucide-react";

export type SideMenuConfigPageType = {
  label: string;
  path: string;
  href?: string;
  role: string;
  iconComponent?: any;
};
export type SideMenuType = {
  iconComponent: any;
  page: SideMenuConfigPageType;
  prefix?: string;
  pages?: SideMenuConfigPageType[];
  order?: number;
};
export type SideMenuConfigType = {
  [key: string]: SideMenuType;
};

const configs: SideMenuConfigType = {
  dashboard: {
    order: 1,
    iconComponent: HomeIcon,
    page: {
      label: "dashboard",
      path: "",
      href: "/",
      role: "dashboard",
    },
    pages: [
      {
        label: "overview",
        path: "",
        href: "/",
        role: "dashboard",
        iconComponent: SquareGanttChart,
      },
      {
        label: "merchants",
        path: "merchants",
        role: "merchant",
        href: "/merchants",
        iconComponent: Building,
      },
      {
        label: "stores",
        path: "stores",
        role: "store",
        href: "/stores",
        iconComponent: Store,
      },
      {
        label: "menus",
        path: "menus",
        role: "menu",
        href: "/menus",
        iconComponent: BookOpen,
      },
      {
        label: "categories",
        path: "categories",
        role: "category",
        href: "/categories",
        iconComponent: Tags,
      },
      {
        label: "templates",
        path: "templates",
        role: "template",
        href: "/templates",
        iconComponent: LayoutTemplate,
      },
      {
        label: "subscriptions",
        path: "subscriptions",
        role: "merchant-subscription",
        href: "/subscriptions",
        iconComponent: CalendarDays,
      },
    ],
  },
  settings: {
    order: 1,
    iconComponent: Settings,
    page: {
      label: "settings",
      path: "/settings",
      href: "/settings",
      role: "setting",
    },
    pages: [
      {
        label: "roles",
        path: "roles",
        role: "role",
        href: "/roles",
        iconComponent: ShieldCheck,
      },
      {
        label: "account",
        path: "account",
        role: "account",
        href: "/account",
        iconComponent: SquareUserRound,
      },
      {
        label: "configurations",
        path: "configurations",
        role: "configuration",
        href: "/configurations",
        iconComponent: Bolt,
      },
    ],
  },
};

export default configs;
