import React from "react";
import BudgetDonutChart from "../homepage/BudgetDonutChart.tsx";
import useSWR from "swr";
import { Transaction } from "../../types/Transaction.ts";
import { Budget } from "../../types/Budget";
import { fetcher } from "../../utils/fetcher";
import Spending from "./Spending.tsx";
const colors = {
  0: "before:bg-green",
  1: "before:bg-cyan",
  2: "before:bg-navy",
  3: "before:bg-yellow",
};

export default function BudgetsPage() {
  const { data, error, isLoading } = useSWR(
    "dashboard/combined-fetch",
    async () => {
      const [budgets, transactions]: [Budget[], Transaction[]] =
        await Promise.all([
          fetcher("http://localhost:3000/budgets/get"),
          fetcher("http://localhost:3000/transactions/get"),
        ]);
      return { budgets, transactions };
    }
  );

  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Failed to load transactions.</div>;

  const limit = data.budgets.reduce((acc, budget) => acc + budget.amount, 0);
  const pieChartColors = ["#277C78", "#82C9D7", "#F2CDAC", "#626070"];

  return (
    <div className=" flex flex-col gap-[32px] pb-[20%] md:pb-[10%] h-fit xl:pb-[24px] xl:pt-[24px] xl:pl-[16px] xl:pr-[48px] w-full xl:ml-[var(--sidebar-width)]">
      <div className="flex w-full justify-between items-center">
        <p className="text-gray-900 text-preset-1"> Budgets</p>{" "}
        <button className="bg-gray-900 rounded-[8px] p-[16px] text-preset-4-bold text-white">
          + Add New Budget
        </button>
      </div>
      <div className="flex flex-col gap-[24px] md:flex-row w-full bg-white pt-[24px] pb-[24px] pl-[20px] pr-[20px] rounded-[12px]">
        <div className="relative grid place-content-center md:flex-[4] xl:flex-[3]">
          <BudgetDonutChart
            limit={Math.round(limit)}
            spent={1273}
            colors={pieChartColors}
            data={data.budgets.slice(0, 4)}
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
              data={data.budgets.slice(0, 4)}
              width={240}
              height={240}
              text={false}
              innerRadius={80}
              outerRadius={95}
              className="opacity-[0.8]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <p className="text-preset-2 text-gray-900"> Spending Summary </p>
          {data.budgets?.slice(0, 4).map(({ category, amount }, index) => {
            const bgColor = colors[index];
            return (
              <div
                key={index}
                className={`flex items-center justify-between pl-[16px] mt-[16px] relative before:content-[''] after:absolute after:left-0 after:bottom-[-12px] after:w-full after:content-[''] after:bg-gray-100 after:h-[1px] before:absolute before:top-[10%] before:bottom-[10%] before:left-0 before:w-[4px] before:rounded-full ${bgColor}`}
              >
                <p className="text-preset-4 text-gray-500">{category}</p>
                <div className="flex items-center gap-[8px]">
                  <p className="text-preset-3 text-gray-900">$12</p>
                  <p className="text-preset-5 text-gray-500">of ${amount}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Spending
        budget={data.budgets.find(
          (budget) => budget.category === "Entertainment"
        )}
        color="green"
        transactions={data.transactions.filter(
          (transaction) =>
            transaction.category === "Entertainment" &&
            transaction.type === "OUTGOING"
        )}
      />
      <Spending
        budget={data.budgets.find((budget) => budget.category === "Bills")}
        color="cyan"
        transactions={data.transactions.filter(
          (transaction) =>
            transaction.category === "Bills" && transaction.type === "OUTGOING"
        )}
      />
      <Spending
        budget={data.budgets.find((budget) => budget.category === "Dining Out")}
        color="yellow"
        transactions={data.transactions.filter(
          (transaction) =>
            transaction.category === "Dining Out" &&
            transaction.type === "OUTGOING"
        )}
      />
      <Spending
        budget={data.budgets.find(
          (budget) => budget.category === "Personal Care"
        )}
        color="navy"
        transactions={data.transactions.filter(
          (transaction) =>
            transaction.category === "Personal Care" &&
            transaction.type === "OUTGOING"
        )}
      />
    </div>
  );
}
