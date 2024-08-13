export interface SearchParams {
  page: number;
  perPage?: number;
  q?: string;
}

export type Meta = {
  total: number;
  perPage: number;
  currentPage: number;
  totalPage: number;
};

/////
export type Category = {
  id: string | number;
  name: {
    km: string;
    en: string;
    cn: string;
  };
  status: string;
  image?: string;
  created_at: number;
};

//////
export type Role = {
  id: string | number;
  name: string;
  privileges: Privileges[] | [];
  created_at: number;
};

export type Privileges = {
  id: string | number;
  name: string;
  module: string;
  group: string;
  created_at: number;
};

////
export type Store = {
  id: string | number;
  name: string;
  slug: string;
  address: string;
  contacts: { name: string; phone_number: string }[];
  socials?: { name: string; url: string }[];
  operation_hours: { start_hour: string; end_hour: string };
  operation_days: string[];
  is_holiday_break: boolean;
  latitude: number;
  longitude: number;
  opening_status: "open" | "close";
  currency: "KHR" | "USD";
  image?: string;
  created_at: number;
  merchant_id?: string;
  merchant?: Merchant;
  templates?: Template[];
  categories?: Category[];
};

////
export type Template = {
  id: string | number;
  name: string;
  categories: Category[];
  created_at: number;
};

////
export type Merchant = {
  id: string | number;
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  status: "active" | "inactive";
  role_id: number;
  role?: Role;
  level: "ordinary" | "master" | "super";
  stores?: Store[];
  created_at: number;
};

////
export type Menu = {
  id: string | number;
  name: { en: string; km: string; cn: string };
  description: string;
  price: string;
  merchant_id: number | string;
  merchant?: Merchant;
  status: string;
  images: { id: string; image: string }[];
  categories: Category[];
  created_at: number;
};

////////////
export interface selectValue {
  label: string;
  value: string | number;
  is_visible?: boolean;
}

////
export type Subscription = {
  id: string | number;
  status?: string;
  created_at: number;
  merchant: Merchant;
  subscription: {
    name: string;
    price: number;
    duration: number;
    status?: string;
    created_at: number;
  };
};
