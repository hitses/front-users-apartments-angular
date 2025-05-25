export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserTable {
  id: number;
  firstName: string;
  email: string;
}
