import React from "react";
import BudgetDonutChart from "./BudgetDonutChart";
import useSWR from "swr";

const colors = {
  0: "before:bg-green",
  1: "before:bg-cyan",
  2: "before:bg-navy",
  3: "before:bg-yellow",
};
interface BudgetType {
  id: number;
  amount: number;
  category: string;
  userId: number;
}

export default function Transactions() {
  const {
    data: budgets,
    error,
    isLoading,
  } = useSWR<BudgetType[]>("http://localhost:3000/budgets/get");

  if (isLoading || !budgets) return <div>Loading...</div>;
  if (error) return <div>Failed to load transactions.</div>;

  if (budgets) {
    const limit = budgets.reduce((acc, budget) => acc + budget.amount, 0);
    const pieChartColors = ["#277C78", "#82C9D7", "#F2CDAC", "#626070"];
    return (
      <div className="rounded-[12px] flex flex-col gap-[24px] bg-white pt-[20px] pr-[24px] pb-[20px] pl-[24px] xl:gap-[50px] xl:pt-[30px] xl:pb-[50px] xl:pr-[36px] xl:pl-[36px]">
        <div className="flex w-full justify-between items-center">
          <p className="text-preset-2 text-gray-900"> Budgets </p>
          <div className="text-preset-4 text-gray-500 flex gap-[16px]">
            <p>See Details</p>
            <img src="../../mentor-starter-code/assets/images/icon-caret-right.svg" />
          </div>
        </div>

        <div className="flex flex-col gap-[24px] md:flex-row w-full">
          <div className="relative grid place-content-center md:flex-[4] xl:flex-[3]">
            <BudgetDonutChart
              limit={Math.round(limit)}
              spent={1273}
              colors={pieChartColors}
              data={budgets.slice(0, 4)}
              width={240}
              height={240}
              innerRadius={95}
              outerRadius={120}
            />
            <div className="absolute inset-0 grid place-content-center">
              <BudgetDonutChart
                limit={Math.round(limit)}
                spent={12}
                colors={pieChartColors}
                data={budgets.slice(0, 4)}
                width={240}
                height={240}
                text={false}
                innerRadius={80}
                outerRadius={95}
                className="opacity-[0.8]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[12px] md:grid-cols-1 md:flex-[2]">
            {budgets?.slice(0, 4).map(({ category, amount }, index) => {
              const bgColor = colors[index];
              return (
                <div
                  key={index}
                  className={`flex flex-col items-start gap-[8px] pl-[12px] relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[4px] before:rounded-full ${bgColor}`}
                >
                  <p className="text-preset-5 text-gray-500">{category}</p>
                  <p className="text-preset-4-bold text-gray-900">${amount}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
