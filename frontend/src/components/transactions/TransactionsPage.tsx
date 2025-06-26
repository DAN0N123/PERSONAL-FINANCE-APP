import useSWR from "swr";
import { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";

import sortTransactions from "../../utils/sortTransactions";

import { Transaction } from "../../types/Transaction";

import TransactionToggles from "./TransactionToggles";
import PaginationFooter from "../reusable/PaginationFooter";
import TransactionList from "./TransactionList";

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
  } else if (error) {
    ("Failed to load transactions");
  }
  const totalPages = Math.ceil(transactions.length / 10);

  return (
    <div className="flex flex-col gap-[32px] h-fit pb-[20%] xl:pb-[24px] xl:pt-[24px] xl:pl-[16px] xl:pr-[48px] w-full xl:ml-[var(--sidebar-width)]">
      <p className="text-gray-900 text-preset-1"> Transactions</p>
      <div className="bg-white flex flex-col gap-[16px] h-full pl-[20px] pr-[20px] pt-[24px] pb-[24px] rounded-[12px] md:gap-x-[0px] md:grid md:grid-cols-[3fr_1fr_1fr_1fr]">
        <TransactionToggles
          state={{ sort, category, search }}
          stateSetters={{ setSearch, setCategory, setSort }}
        />
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
        <TransactionList transactions={transactions} page={page} />
        <div className="h-full"></div>
        <PaginationFooter
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
