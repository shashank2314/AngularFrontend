export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}