export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // if needed
  balance?: number;
  income?: number;
  expenses?: number;
}
