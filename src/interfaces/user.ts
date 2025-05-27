// Interfaz de usuario para garantizar la consistencia de los datos del usuario en la aplicación
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
