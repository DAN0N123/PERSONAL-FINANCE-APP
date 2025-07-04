import React from "react";
import useSWR from "swr";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

type TransactionType = "INCOMING" | "OUTGOING";

interface TransactionTypes {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: TransactionType;
  userId: number;
  counterpartyId: number;
  counterparty: Record<string, any>;
  user: Record<string, any>;
}

export default function Transactions() {
  const {
    data: transactions,
    error,
    isLoading,
  } = useSWR<TransactionTypes[]>("http://localhost:3000/transactions/get");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load transactions.</div>;

  return (
    <div className="rounded-[12px] flex flex-col gap-[32px] bg-white pt-[20px] pr-[24px] pb-[20px] pl-[24px] xl:pt-[30px] xl:pb-[30px] xl:pr-[36px] xl:pl-[36px]">
      <div className="flex w-full justify-between items-center">
        <p className="text-preset-2 text-gray-900"> Transactions </p>
        <Link
          to={"/transactions"}
          className="text-preset-4 text-gray-500 flex gap-[16px]"
        >
          <p>View All</p>
          <img src="../../mentor-starter-code/assets/images/icon-caret-right.svg" />
        </Link>
      </div>
      {transactions
        ?.slice(0, 6)
        .map(({ counterparty, amount, date }, index) => {
          const color = amount > 0 ? "text-green" : "text-gray-900";
          const colors = {
            0: "bg-green",
            1: "bg-cyan",
            2: "bg-navy",
            3: "bg-yellow",
          };
          const beforeVisibility =
            index === transactions.length - 1 && "before:hidden";

          const dt = DateTime.fromISO(date);
          const formatted = dt.toFormat("d LLLL yyyy");
          return (
            <div
              key={index}
              className={`flex justify-between items-center relative before:absolute pb-[12px] before:w-full before:left-0 before:bottom-0 before:bg-gray-300 before:h-[1px] ${beforeVisibility}`}
            >
              <div className="flex gap-[8px] items-center">
                <div
                  className={`${
                    colors[index % Object.keys(colors).length]
                  } w-[32px] h-[32px] rounded-[50%]`}
                ></div>
                <p className="text-gray-900 text-preset-4-bold">
                  {" "}
                  {counterparty.name}{" "}
                </p>
              </div>
              <div className="flex flex-col gap-[8px]">
                <p className={`text-preset-4-bold ${color}`}>
                  {" "}
                  {amount > 0 ? "+" : "-"}${Math.abs(amount)}
                </p>
                <p className="text-preset-5 text-grey-500">{formatted}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
