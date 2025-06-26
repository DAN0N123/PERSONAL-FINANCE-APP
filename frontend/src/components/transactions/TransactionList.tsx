import { DateTime } from "luxon";

export default function TransactionList({ transactions, page }) {
  return (
    <>
      {transactions.length > 0 ? (
        transactions
          ?.slice(10 * (page - 1), 10 * (page - 1) + 10)
          .map(({ counterparty, amount, date, category }, index) => {
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
              <>
                <div
                  key={index}
                  className={`md:hidden flex justify-between items-center relative before:absolute pb-[12px] before:w-full before:left-0 before:bottom-0 before:bg-gray-300 before:h-[1px] ${beforeVisibility}`}
                >
                  <div className="flex gap-[8px] items-center">
                    <div
                      className={`${
                        colors[index % Object.keys(colors).length]
                      } w-[32px] h-[32px] rounded-[50%]`}
                    ></div>
                    <div className="flex flex-col gap-[8px]">
                      <p className="text-gray-900 text-preset-4-bold">
                        {" "}
                        {counterparty.name}{" "}
                      </p>
                      <p className="text-preset-5 text-grey-500">{category}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className={`text-preset-4-bold ${color}`}>
                      {" "}
                      {amount > 0 ? "+" : "-"}${Math.abs(amount)}
                    </p>
                    <p className="text-preset-5 text-grey-500">{formatted}</p>
                  </div>
                </div>
                <div
                  key={index}
                  className={`hidden md:grid md:grid-cols-[3fr_1fr_1fr_1fr] col-span-full relative before:absolute pb-[12px] before:w-full before:left-0 before:bottom-0 before:bg-gray-300 before:h-[1px] ${beforeVisibility}`}
                >
                  <div className="flex gap-[8px] items-center col-start-[1] col-end-[2]">
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
                  <div className="col-start-[2] col-end-[3] flex items-center justify-start">
                    <p className="text-preset-5 text-grey-500 ">{category}</p>
                  </div>
                  <p className="text-preset-5 text-grey-500 col-start-[3] col-end-[4] flex items-center ">
                    {formatted}
                  </p>
                  <p
                    className={`text-preset-4-bold ${color} col-start-[4] col-end-[5] flex items-center justify-end`}
                  >
                    {" "}
                    {amount > 0 ? "+" : "-"}${Math.abs(amount)}{" "}
                  </p>
                </div>
              </>
            );
          })
      ) : (
        <p className="p-4 w-full text-center text-preset-3 text-gray-500 md:col-span-full">
          {" "}
          No transactions to display
        </p>
      )}
    </>
  );
}
