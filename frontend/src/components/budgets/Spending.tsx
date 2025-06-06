import { Budget } from "../../types/Budget";
import { Transaction } from "../../types/Transaction";
interface SpendingTypes {
  budget: Budget | undefined;
  transactions: Transaction[];
}

import { DateTime } from "luxon";

export default function Spending({ budget, transactions }: SpendingTypes) {
  const bgColor = `bg-${budget?.color}`;

  console.log(budget?.category, bgColor);

  if (!budget || !transactions) return;

  const transactionsTotal = Math.abs(
    transactions.reduce((acc, current) => acc + current.amount, 0)
  );

  let progress = Math.round((transactionsTotal / budget.amount) * 100) / 100;
  const barWidth = progress < 1 ? `${progress * 100}%` : "100%";

  return (
    <div className="flex flex-col gap-[24px] md:flex-row w-full bg-white pt-[24px] pb-[24px] pl-[20px] pr-[20px] rounded-[12px]">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-[12px]">
          <div className={`rounded-[50%] w-[16px] h-[16px] ${bgColor}`}></div>

          <p className="text-preset-2 tex-gray-900">{budget.category}</p>
        </div>
        <img
          src="../../../mentor-starter-code/assets/images/icon-ellipsis.svg"
          alt=""
        />
      </div>
      <p className="text-gray-500 text-preset-4">Maximum of ${budget.amount}</p>
      <div className="w-full bg-beige-100 rounded-[4px] p-[4px] h-[32px]">
        <div
          className={`${bgColor} rounded-[4px] h-full`}
          style={{ width: barWidth }}
        ></div>
      </div>
      <div className="flex justify-between">
        <div
          className={`flex-1 pl-[16px] relative before:content-[''] before:absolute before:top-[10%] before:bottom-[10%] before:left-0 before:w-[4px] before:rounded-full before:${bgColor}`}
        >
          <div className="flex flex-col">
            <p className="text-preset-5 text-gray-500">Spent</p>
            <p className="text-preset-4-bold text-gray-900">
              ${Math.round(transactionsTotal * 100) / 100}
            </p>
          </div>
        </div>
        <div
          className={`flex-1 pl-[16px] relative before:content-[''] before:absolute before:top-[10%] before:bottom-[10%] before:left-0 before:w-[4px] before:rounded-full before:bg-beige-100`}
        >
          <div className="flex flex-col">
            <p className="text-preset-5 text-gray-500">Free</p>
            <p className="text-preset-4-bold text-gray-900">
              {budget.amount < transactionsTotal
                ? `-$${Math.abs(
                    Math.round((budget.amount - transactionsTotal) * 100) / 100
                  )}`
                : `$${
                    Math.round((budget.amount - transactionsTotal) * 100) / 100
                  }`}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-beige-100 rounded-[12px] p-[16px] flex flex-col gap-[20px]">
        <div className="flex w-full justify-between items-center">
          <p className="text-gray-900 text-preset-3">Latest Spending</p>
          <div className="flex gap-[12px] items-center">
            <p className="text-gray-500 text-preset-4">See all</p>
            <img
              src="../../../mentor-starter-code/assets/images/icon-caret-right.svg"
              className="w-[12px] h-[12px]"
            />
          </div>
        </div>
        {transactions
          .slice(0, 3)
          .map(({ counterparty, amount, date }, index) => {
            const color = amount > 0 ? "text-green" : "text-gray-900";
            const beforeVisibility = index === 2 && "before:hidden";
            const dt = DateTime.fromISO(date);
            const formatted = dt.toFormat("d LLLL yyyy");
            return (
              <div
                key={index}
                className={`md:hidden flex justify-between items-center relative before:absolute before:w-full before:left-0 before:bottom-[-10px] before:bg-gray-300 before:h-[1px] ${beforeVisibility}`}
              >
                <div className="flex gap-[8px] items-center">
                  <p className="text-gray-900 text-preset-4-bold">
                    {" "}
                    {counterparty.name}{" "}
                  </p>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className={`text-preset-4-bold ${color} text-end`}>
                    {" "}
                    {amount > 0 ? "+" : "-"}${Math.abs(amount)}
                  </p>
                  <p className="text-preset-5 text-grey-500">{formatted}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
