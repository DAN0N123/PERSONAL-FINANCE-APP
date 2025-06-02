import useSWR from "swr";
import { DateTime } from "luxon";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useState } from "react";
import Icon from "../reusable/Icon";
import Dropdown from "../reusable/Dropdown";

export default function TransactionsPage() {
  const {
    data: transactions,
    isLoading,
    error,
  } = useSWR("http://localhost:3000/transactions/get");
  const [page, setPage] = useState(1);
  if (!transactions) return;

  const totalPages = Math.ceil(transactions.length / 10);

  return (
    <div className="flex flex-col gap-[32px] h-fit pb-[20%] xl:pt-[24px] xl:pl-[16px] xl:pr-[48px] w-full xl:ml-[var(--sidebar-width)]">
      <p className="text-gray-900 text-preset-1"> Transactions</p>
      <div className="bg-white flex flex-col gap-[16px] h-full pl-[20px] pr-[20px] pt-[24px] pb-[24px] rounded-[12px]">
        <div className="flex justify-between items-center w-full gap-[8px]">
          <div className="rounded-[8px] pl-[20px] pr-[20px] pt-[12px] pb-[12px] flex border-[1px] border-gray-200 flex items-center">
            <input
              type="text"
              placeholder="Search transaction"
              className="focus:outline-none mr-[-25px]"
            />
            <button className="w-[1rem] h-[1rem]">
              <img
                src="../../../mentor-starter-code/assets/images/icon-search.svg"
                className="w-full h-auto"
              />
            </button>
          </div>

          <Dropdown
            width={20}
            height={20}
            options={[
              "Latest",
              "Oldest",
              "A to Z",
              "Z to A",
              "Highest",
              "Lowest",
            ]}
          >
            {" "}
            <img
              src="../../../mentor-starter-code/assets/images/icon-sort-mobile.svg"
              className="w-[20px] h-auto"
            />
          </Dropdown>

          <Dropdown
            width={20}
            height={20}
            options={[
              "Entertainment",
              "Bills",
              "Groceries",
              "Dining Out",
              "Transportation",
              "Personal Care",
            ]}
          >
            <img
              src="../../../mentor-starter-code/assets/images/icon-filter-mobile.svg"
              className="w-[20px] h-auto"
            />
          </Dropdown>
        </div>
        {transactions
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
            );
          })}

        <Pagination
          count={totalPages}
          page={page}
          defaultPage={1}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: () => (
                  <Icon
                    variant="arrow-left"
                    color="hsl(0, 0%, 41%)"
                    width="16px"
                    height="16px"
                  />
                ),
                next: () => (
                  <Icon
                    variant="arrow-right"
                    color="hsl(0, 0%, 41%)"
                    width="16px"
                    height="16px"
                  />
                ),
              }}
              {...item}
            />
          )}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            "& ul": {
              display: "flex",
              flexWrap: "nowrap",
              width: "100%",
              maxWidth: "700px",
              justifyContent: "center",
              gap: "4px",
            },
            "& ul li": {
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            "& .MuiPaginationItem-root": {
              flex: 1,
              borderRadius: "0.5rem",
              border: "1px solid #bdbdbd",
              height: "40px",
              fontWeight: 500,
            },
            "& .Mui-selected": {
              backgroundColor: "#111",
              color: "white",
              borderColor: "#222",
              "&:hover": {
                backgroundColor: "#222",
              },
            },
            "& .MuiPaginationItem-ellipsis": {
              border: "1px solid #bdbdbd",
              borderRadius: "0.5rem",
              fontSize: "16px",
              color: "black",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
          onChange={(_, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
          siblingCount={0}
          boundaryCount={1}
        />
      </div>
    </div>
  );
}
