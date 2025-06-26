import React, { useEffect, useState } from "react";
import BudgetDonutChart from "../homepage/BudgetDonutChart.tsx";
import useSWR from "swr";
import { Transaction } from "../../types/Transaction.ts";
import { Budget } from "../../types/Budget";
import { fetcher } from "../../utils/fetcher";
import BudgetForm from "./BudgetForm.tsx";
import Spending from "./Spending.tsx";
import { Color } from "../../types/Color.ts";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter.js";

const colors = {
  0: "before:bg-green",
  1: "before:bg-cyan",
  2: "before:bg-navy",
  3: "before:bg-yellow",
};

const selectedColors = {
  Green: "hsl(177, 55%, 32%)",
  Yellow: "hsl(24, 70%, 87%)",
  Cyan: "hsl(192, 59%, 85%)",
  Navy: "hsl(240, 8%, 41%)",
  Red: "hsl(7, 53%, 50%)",
  Purple: "hsl(260, 30%, 59%)",
  Turquoise: "hsl(180, 16%, 42%)",
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

  const [modalActive, setModalActive] = useState(false);

  const [newCategory, setNewCategory] = useState("Entertainment");
  const [newAmount, setNewAmount] = useState<number | string>("");
  const [newTagColor, setNewTagColor] = useState<Color>("Green");

  const [usedColors, setUsedColors] = useState<string[]>([]);

  useEffect(() => {
    if (data?.budgets) {
      let usedColorsArr: string[] = [];
      data.budgets.forEach((budget) => {
        return usedColorsArr.push(budget.color);
      });
      setUsedColors(usedColorsArr);
    }
  }, [data]);

  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Failed to load transactions.</div>;

  const limit = data.budgets.reduce((acc, budget) => acc + budget.amount, 0);
  const pieChartColors = data.budgets.map((budget) => {
    return selectedColors[capitalizeFirstLetter(budget.color)];
  });

  async function addBudget(e) {
    e.preventDefault();
    const data = {
      category: newCategory,
      color: newTagColor.toLowerCase(),
      amount: newAmount,
    };
    const response = await fetch("http://localhost:3000/budgets/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!result.ok) return console.log("error");

    setModalActive(false);
    window.location.reload();
  }

  return (
    <div className="isolate relative flex flex-col gap-[32px] pb-[20%] h-fit xl:pb-[24px] xl:pt-[24px] xl:pl-[16px] xl:pr-[48px] w-full xl:ml-[var(--sidebar-width)]">
      {modalActive && (
        <BudgetForm
          buttonText={"Add Budget"}
          title={"Add New Budget"}
          submit={addBudget}
          disableModal={() => setModalActive(false)}
          categoryVal={newCategory}
          colorVal={newTagColor}
          amountVal={newAmount}
          setCategory={setNewCategory}
          setAmount={setNewAmount}
          setColor={setNewTagColor}
          usedColors={usedColors}
        />
      )}
      <div className="flex w-full justify-between items-center">
        <p className="text-gray-900 text-preset-1"> Budgets</p>{" "}
        <button
          className="bg-gray-900 rounded-[8px] p-[16px] text-preset-4-bold text-white"
          onClick={() => {
            setModalActive(true);
          }}
        >
          + Add New Budget
        </button>
      </div>
      <div className="flex flex-col gap-[24px] md:flex-row w-full bg-white pt-[24px] pb-[24px] pl-[20px] pr-[20px] rounded-[12px] xl:pt-[40px] xl:pb-[40px] xl:pl-[10%] xl:pr-[10%]">
        <div className="relative grid place-content-center md:flex-[3]">
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
          <div className="absolute inset-0 grid place-content-center w-full">
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
        <div className="flex flex-col gap-[16px] md:flex-[4]">
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
                  <p className="text-preset-3 text-gray-900">
                    $
                    {Math.abs(
                      Math.round(
                        data.transactions
                          .filter(
                            (transaction) =>
                              transaction.category === category &&
                              transaction.type === "OUTGOING"
                          )
                          .reduce(
                            (acc, transaction) => acc + transaction.amount,
                            0
                          ) * 100
                      ) / 100
                    )}
                  </p>
                  <p className="text-preset-5 text-gray-500">of ${amount}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Spending
        usedColors={usedColors}
        budget={data.budgets.find(
          (budget) => budget.category === "Entertainment"
        )}
        transactions={data.transactions.filter(
          (transaction) =>
            transaction.category === "Entertainment" &&
            transaction.type === "OUTGOING"
        )}
      />
      <Spending
        usedColors={usedColors}
        budget={data.budgets.find((budget) => budget.category === "Bills")}
        transactions={data.transactions.filter(
          (transaction) =>
            transaction.category === "Bills" && transaction.type === "OUTGOING"
        )}
      />
      <Spending
        usedColors={usedColors}
        budget={data.budgets.find((budget) => budget.category === "Dining Out")}
        transactions={data.transactions.filter(
          (transaction) =>
            transaction.category === "Dining Out" &&
            transaction.type === "OUTGOING"
        )}
      />
      <Spending
        usedColors={usedColors}
        budget={data.budgets.find(
          (budget) => budget.category === "Transportation"
        )}
        transactions={data.transactions.filter(
          (transaction) =>
            transaction.category === "Transportation" &&
            transaction.type === "OUTGOING"
        )}
      />
    </div>
  );
}
