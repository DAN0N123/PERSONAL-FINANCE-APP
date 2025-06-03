import { Transaction } from "../types/Transaction";

function sortByDate(transactions: Transaction[], order: "Latest" | "Oldest") {
  return [...transactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return order === "Latest" ? dateB - dateA : dateA - dateB;
  });
}

function sortByName(transactions: Transaction[], order: "A to Z" | "Z to A") {
  return [...transactions].sort((a, b) => {
    const nameA = a.counterparty.name.toLowerCase();
    const nameB = b.counterparty.name.toLowerCase();

    if (nameA < nameB) return order === "A to Z" ? -1 : 1;
    if (nameA > nameB) return order === "A to Z" ? 1 : -1;
    return 0;
  });
}

function sortByAmount(
  transactions: Transaction[],
  order: "Highest" | "Lowest"
) {
  return [...transactions].sort((a, b) =>
    order === "Highest" ? b.amount - a.amount : a.amount - b.amount
  );
}

export default function sortTransactions({
  order,
  transactions,
}: {
  order: string;
  transactions: Transaction[];
}) {
  switch (order) {
    case "Latest":
      return sortByDate(transactions, "Latest");
    case "Oldest":
      return sortByDate(transactions, "Oldest");
    case "A to Z":
      return sortByName(transactions, "A to Z");
    case "Z to A":
      return sortByName(transactions, "Z to A");
    case "Highest":
      return sortByAmount(transactions, "Highest");
    case "Lowest":
      return sortByAmount(transactions, "Lowest");
    default:
      throw new Error("Invalid sort order");
  }
}
