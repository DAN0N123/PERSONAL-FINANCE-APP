import { Color } from "./Color";

export type Pot = {
  id: number;
  name: string;
  amount: number;
  target: number;
  color: Lowercase<Color>;
  userId: number;
};
