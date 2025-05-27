// Interfaz de apartamento para garantizar la consistencia de los datos del apartamento en la aplicación
export interface Apartment {
  id?: number;
  rooms: number;
  bathrooms: number;
  area: number;
  floor: number;
  description: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
