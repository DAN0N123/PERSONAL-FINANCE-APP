export interface UserType {
    id: number;
    name: string;
    email: string;
    password?: string; // if needed
    createdAt: string; // or Date if you parse it
    balance?: number;
    income?: number;
    expenses?: number;
  }
  