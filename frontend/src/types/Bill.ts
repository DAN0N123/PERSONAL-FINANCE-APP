type Status = "UPCOMING" | "DUE" | "PAID";
type BillType = "MONTHLY" | "ONETIME";

export type Bill = {
  id: number;
  status: Status;
  amount: number;
  dueDay?: number;
  dueExactDate?: Date;
  payee: string;
  type: BillType;
};
