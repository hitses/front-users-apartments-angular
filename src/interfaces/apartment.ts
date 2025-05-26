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

export interface ApartmentTable {
  id: number;
  rooms: number;
  price: number;
}
