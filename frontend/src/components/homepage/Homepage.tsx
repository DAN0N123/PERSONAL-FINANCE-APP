import Sidebar from "../Sidebar";
import Tile from "../Tile";
import Pots from "./Pots";
import Transactions from "./Transactions";
import Budgets from "./Budgets";
import Bills from "./RecurringBills";
import { motion } from "framer-motion";
export default function Homepage() {
  return (
    <motion.div
      className="will-change-[width] flex flex-col gap-[32px] h-full p-[16px] xl:p-0 xl:flex-row w-full transform-width xl:overflow-y-clip"
      layoutId="homepage"
    >
      <Sidebar />
      <div className="flex flex-col gap-[32px] xl:pt-[48px] xl:pl-[16px] xl:pr-[48px] w-full">
        <p className="text-gray-900 text-preset-1"> Overview</p>
        <div className="flex flex-col gap-[16px] md:grid md:grid-cols-3">
          <Tile variant="dark" title="Current Balance" value="4,836.00"></Tile>
          <Tile variant="light" title="Income" value="3,814.25"></Tile>
          <Tile variant="light" title="Expenses" value="1,700.50"></Tile>
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
    </motion.div>
  );
}
