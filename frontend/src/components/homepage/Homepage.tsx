import Tile from "../reusable/Tile";
import Pots from "./Pots";
import Transactions from "./Transactions";
import Budgets from "./Budgets";
import Bills from "./RecurringBills";
import useSWR from "swr";

interface UserData {
  balance: string;
  income: string;
  expenses: string;
}

export default function Homepage() {
  const {
    data: userData,
    error,
    isLoading,
  } = useSWR<UserData>("http://localhost:3000/user/getData");

  if (error) return "an error has occured";
  if (isLoading) return "Loading...";

  return (
    <div className="flex flex-col gap-[32px] xl:pt-[24px] xl:pl-[16px] xl:pr-[48px] w-full xl:ml-[var(--sidebar-width)]">
      <p className="text-gray-900 text-preset-1"> Overview</p>
      <div className="flex flex-col gap-[16px] md:grid md:grid-cols-3">
        <Tile
          variant="dark"
          title="Current Balance"
          value={userData?.balance || "-"}
        ></Tile>
        <Tile
          variant="light"
          title="Income"
          value={userData?.income || "-"}
        ></Tile>
        <Tile
          variant="light"
          title="Expenses"
          value={userData?.expenses || "-"}
        ></Tile>
      </div>
      <div className="flex flex-col gap-[32px] xl:flex-row">
        <div className="flex flex-col xl:flex-[4] gap-[32px] xl:h-full xl:justify-between">
          <Pots></Pots>
          <Transactions></Transactions>
        </div>
        <div className="flex flex-col xl:flex-[3] gap-[32px]">
          <Budgets></Budgets>
          <Bills></Bills>
        </div>
      </div>
      <div className="min-h-[80px]"></div>
    </div>
  );
}
