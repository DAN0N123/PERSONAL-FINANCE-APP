import ordinal from "ordinal";
import { DateTime } from "luxon";
export default function BillList({ bills, page }) {
  return (
    <>
      {bills.length > 0 ? (
        bills
          ?.slice(8 * (page - 1), 8 * (page - 1) + 8)
          .map(
            ({ payee, amount, status, type, dueDay, dueExactDate }, index) => {
              const color = status === "DUE" ? "text-red" : "text-gray-900";
              const colors = {
                0: "bg-green",
                1: "bg-cyan",
                2: "bg-navy",
                3: "bg-yellow",
              };
              const beforeVisibility =
                index === bills.length - 1 && "before:hidden";

              let formatted;
              if (dueExactDate) {
                const dt = DateTime.fromISO(dueExactDate);
                formatted = dt.toFormat(" LLLL d yyyy");
              }

              return (
                <>
                  <div
                    key={index}
                    className={`md:hidden flex flex-col justify-between gap-[8px] items-center relative before:absolute pb-[12px] before:w-full before:left-0 before:bottom-0 before:bg-gray-300 before:h-[1px] ${beforeVisibility}`}
                  >
                    <div className="flex gap-[16px] items-center w-full">
                      <div
                        className={`${
                          colors[index % Object.keys(colors).length]
                        } w-[32px] h-[32px] rounded-[50%]`}
                      ></div>
                      <div className="flex flex-col gap-[8px]">
                        <p className="text-gray-900 text-preset-4-bold">
                          {" "}
                          {payee}{" "}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="flex items-center gap-[8px]">
                        <p className="text-preset-5 text-green">
                          {" "}
                          {type === "MONTHLY" ? (
                            <p>Monthly - {ordinal(dueDay)}</p>
                          ) : (
                            <p>One time - {formatted}</p>
                          )}
                        </p>

                        {status === "DUE" && (
                          <img src="../../../mentor-starter-code/assets/images/icon-bill-due.svg" />
                        )}
                        {status === "PAID" && (
                          <img src="../../../mentor-starter-code/assets/images/icon-bill-paid.svg" />
                        )}
                      </div>
                      <p className={`text-preset-4-bold ${color}`}>
                        {" "}
                        ${Math.abs(amount)}
                      </p>
                    </div>
                  </div>
                  <div
                    key={index}
                    className={`hidden md:grid md:grid-cols-[5fr_3fr_2fr] col-span-full relative before:absolute pt-[16px] pb-[16px] before:w-full before:left-0 before:bottom-0 before:bg-gray-300 before:h-[1px] ${beforeVisibility}`}
                  >
                    <div className="flex gap-[8px] items-center col-start-[1] col-end-[2]">
                      <div
                        className={`${
                          colors[index % Object.keys(colors).length]
                        } w-[32px] h-[32px] rounded-[50%]`}
                      ></div>
                      <p className="text-gray-900 text-preset-4-bold">
                        {" "}
                        {payee}{" "}
                      </p>
                    </div>

                    <div className="flex items-center gap-[8px] col-start-[2] col-end-[3]">
                      <p className="text-preset-5 text-green">
                        {" "}
                        {type === "MONTHLY" ? (
                          <p>Monthly - {ordinal(dueDay)}</p>
                        ) : (
                          <p>One time - {formatted}</p>
                        )}
                      </p>

                      {status === "DUE" && (
                        <img src="../../../mentor-starter-code/assets/images/icon-bill-due.svg" />
                      )}
                      {status === "PAID" && (
                        <img src="../../../mentor-starter-code/assets/images/icon-bill-paid.svg" />
                      )}
                    </div>
                    <p
                      className={`text-preset-4-bold ${color} col-start-[3] col-end-[4] flex items-center justify-end`}
                    >
                      {" "}
                      {amount > 0 ? "+" : "-"}${Math.abs(amount)}{" "}
                    </p>
                  </div>
                </>
              );
            }
          )
      ) : (
        <p className="p-4 w-full text-center text-preset-3 text-gray-500 md:col-span-full">
          {" "}
          No bills to display
        </p>
      )}
    </>
  );
}
