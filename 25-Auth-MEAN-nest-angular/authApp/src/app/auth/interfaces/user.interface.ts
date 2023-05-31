export interface User {
  _id: string;
  isActive: boolean;
  email: string;
  name: string;
  roles: string[];
  __v: number;
}
