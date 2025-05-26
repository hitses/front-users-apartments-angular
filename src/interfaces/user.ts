export interface User {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserTable {
  id: number;
  firstName: string;
  email: string;
}
