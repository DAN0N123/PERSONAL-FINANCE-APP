import Sidebar from "../Sidebar";
import Tile from "../Tile";
import Pots from "./Pots";
import Transactions from "./Transactions";
import Budgets from "./Budgets";
import Bills from "./RecurringBills";

export default function Homepage() {
  return (
    <div className="flex flex-col gap-[32px] h-full p-[16px]">
      <Sidebar />
      <p className="text-gray-900 text-preset-1"> Overview</p>
      <div className="flex flex-col gap-[16px]">
        <Tile variant="dark" title="Current Balance" value="4,836.00"></Tile>
        <Tile variant="light" title="Income" value="3,814.25"></Tile>
        <Tile variant="light" title="Expenses" value="1,700.50"></Tile>
      </div>
      <Pots></Pots>
      <Transactions></Transactions>
      <Budgets></Budgets>
      <Bills></Bills>
      <div className="min-h-[64px]"></div>
    </div>
  );
}
