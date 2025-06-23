import useSWR from "swr";
import { DateTime } from "luxon";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useEffect, useState } from "react";
import Icon from "../reusable/Icon";
import Dropdown from "../reusable/Dropdown";
import sortTransactions from "../../utils/sortTransactions";
import { Transaction } from "../../types/Transaction";
import useQuery from "../../hooks/useQuery";

type Sort = "Latest" | "Oldest" | "A to Z" | "Z to A" | "Highest" | "Lowest";
type Category =
  | "All Transactions"
  | "Entertainment"
  | "Bills"
  | "Groceries"
  | "Dining Out"
  | "Transportation"
  | "Personal Care";

const sortArray: Sort[] = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];

const categoryArray: Category[] = [
  "All Transactions",
  "Entertainment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
];

export default function TransactionsPage() {
  const {
    data: transactionsInit,
    isLoading,
    error,
  } = useSWR("http://localhost:3000/transactions/get");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<Sort>("Latest");
  const [category, setCategory] = useState<Category>("All Transactions");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState<string>();

  let query = useQuery();

  useEffect(() => {
    const category = query.get("category");
    const sort = query.get("sort");

    if (category && categoryArray.includes(category as Category)) {
      const category = query.get("category");
      setCategory(category as Category);
    }
    if (sort && sortArray.includes(sort as Sort)) {
      const sort = query.get("sort");
      setSort(sort as Sort);
    }
  }, [query]);

  useEffect(() => {
    if (!transactionsInit) return;

    const categorizedTransactions =
      category === "All Transactions"
        ? transactionsInit
        : transactionsInit.filter((transaction: Transaction) => {
            return transaction.category === category;
          });

    const sortedTransactions = sortTransactions({
      order: sort,
      transactions: categorizedTransactions,
    });

    const finalTransactions = search
      ? sortedTransactions.filter((transaction) => {
          return transaction.counterparty.name
            .toLowerCase()
            .includes(search.toLowerCase());
        })
      : sortedTransactions;

    setTransactions(finalTransactions);
  }, [sort, category, search, transactionsInit]);

  if (isLoading || !transactionsInit) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading transactions...</p>
      </div>
    );
  }
  const totalPages = Math.ceil(transactions.length / 10);

  return (
    <div className="flex flex-col gap-[32px] h-fit pb-[20%] md:pb-[10%] xl:pb-[24px] xl:pt-[24px] xl:pl-[16px] xl:pr-[48px] w-full xl:ml-[var(--sidebar-width)]">
      <p className="text-gray-900 text-preset-1"> Transactions</p>
      <div className="bg-white flex flex-col gap-[16px] h-full pl-[20px] pr-[20px] pt-[24px] pb-[24px] rounded-[12px] md:gap-x-[0px] md:grid md:grid-cols-[3fr_1fr_1fr_1fr]">
        <div className="flex justify-between items-center w-full gap-[8px] max-w-full md:col-span-full">
          <div className="rounded-[8px] pl-[20px] pr-[20px] pt-[12px] pb-[12px] flex border-[1px] border-gray-200 flex items-center">
            <input
              type="text"
              placeholder="Search transaction"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="focus:outline-none mr-[-25px]"
            />
            <button className="w-[1rem] h-[1rem]">
              <img
                src="../../../mentor-starter-code/assets/images/icon-search.svg"
                className="w-full h-auto"
              />
            </button>
          </div>

          <div className="w-full flex justify-around md:justify-end md:gap-[32px]">
            <div className="md:flex md:items-center md:gap-[8px]">
              <p className="text-preset-4 text-gray-500 text-nowrap hidden md:block">
                Sort by
              </p>
              <Dropdown
                options={[
                  "Latest",
                  "Oldest",
                  "A to Z",
                  "Z to A",
                  "Highest",
                  "Lowest",
                ]}
                value={sort}
                setValue={setSort}
              >
                {" "}
                <img
                  src="../../../mentor-starter-code/assets/images/icon-sort-mobile.svg"
                  className="w-[20px] h-auto  md:hidden"
                />
                <div className="hidden md:flex items-center gap-[8px]">
                  <div className="flex items-center w-max pl-[20px] pr-[20px] pt-[12px] pb-[12px] gap-[16px] rounded-[8px] border-[1px] border-gray-500">
                    <p className="text-nowrap text-gray-900">{sort}</p>
                    <img
                      src="../../../mentor-starter-code/assets/images/icon-caret-down.svg"
                      className="w-[16px] h-[16px]"
                    />
                  </div>
                </div>
              </Dropdown>
            </div>
            <div className="md:flex md:gap-[8px] md:items-center">
              <p className="text-preset-4 text-gray-500 w-fit hidden md:block">
                Category
              </p>
              <Dropdown
                options={[
                  "All Transactions",
                  "Entertainment",
                  "Bills",
                  "Groceries",
                  "Dining Out",
                  "Transportation",
                  "Personal Care",
                ]}
                value={category}
                setValue={setCategory}
              >
                <img
                  src="../../../mentor-starter-code/assets/images/icon-filter-mobile.svg"
                  className="w-[20px] h-auto  md:hidden"
                />
                <div className="hidden md:flex items-center gap-[8px]">
                  <div className="flex items-center w-max pl-[20px] pr-[20px] pt-[12px] pb-[12px] gap-[16px] rounded-[8px] border-[1px] border-gray-500">
                    <p className="text-nowrap text-gray-900">{category}</p>
                    <img
                      src="../../../mentor-starter-code/assets/images/icon-caret-down.svg"
                      className="w-[16px] h-[16px]"
                    />
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
        <p className="text-preset-5 text-gray-500 hidden md:inline">
          Recipient / Sender
        </p>
        <p className="text-preset-5 text-gray-500 hidden md:inline">Category</p>
        <p className="text-preset-5 text-gray-500 hidden md:inline">
          Transaction Date
        </p>
        <p className="text-preset-5 text-gray-500 hidden md:inline text-end">
          Amount
        </p>
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
                        <p className="text-preset-5 text-grey-500">
                          {category}
                        </p>
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
        <div className="h-full"></div>
        <div className="md:col-span-full">
          <Pagination
            count={totalPages}
            page={page}
            defaultPage={1}
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  previous: () => (
                    <>
                      <Icon
                        variant="arrow-left"
                        className="md:hidden"
                        color="hsl(0, 0%, 41%)"
                        width="16px"
                        height="16px"
                      />
                      <div className="hidden md:flex w-full gap-[8px] justify-center items-center">
                        <Icon
                          variant="arrow-left"
                          color="hsl(0, 0%, 41%)"
                          width="12px"
                          height="12px"
                        />
                        <p>Prev</p>
                      </div>
                    </>
                  ),
                  next: () => (
                    <>
                      <Icon
                        variant="arrow-right"
                        className="md:hidden"
                        color="hsl(0, 0%, 41%)"
                        width="16px"
                        height="16px"
                      />
                      <div className="hidden md:flex w-full gap-[8px] justify-center items-center">
                        <p>Next</p>
                        <Icon
                          variant="arrow-right"
                          color="hsl(0, 0%, 41%)"
                          width="12px"
                          height="12px"
                        />
                      </div>
                    </>
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
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#000",
                color: "#fff",
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
    </div>
  );
}
