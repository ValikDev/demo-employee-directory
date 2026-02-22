export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  country: string;
  department: string;
};

export type FilterOption = {
  id: number;
  name: string;
};

export type FilterOptions = {
  roles: FilterOption[];
  countries: FilterOption[];
  departments: FilterOption[];
};

export type ActiveFilters = {
  roles: number[];
  countries: number[];
  departments: number[];
};
