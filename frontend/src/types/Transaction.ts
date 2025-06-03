export interface Transaction {
  id: number;
  amount: number;
  date: string; // ISO string, e.g., "2025-06-02T09:29:30.325Z"
  category: string;
  description: string;
  type: "OUTGOING" | "INCOMING";
  userId: number;
  user: {
    id: number;
    name: string;
  };
  counterpartyId: number;
  counterparty: {
    id: number;
    name: string;
  };
}
