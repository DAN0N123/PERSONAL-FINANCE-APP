import useSWR from "swr";
import Icon from "../reusable/Icon";
import Tile from "../reusable/Tile";
import BillList from "./BillList";
import PaginationFooter from "../reusable/PaginationFooter";
import { useState, useEffect } from "react";
import BillToggles from "./BillToggles";
import { Bill } from "../../types/Bill";
import Summary from "./Summary";

export default function BillsPage() {
  const {
    data: bills,
    isLoading,
    error,
  } = useSWR<Bill[]>("http://localhost:3000/bills/get");

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"MONTHLY" | "ONETIME" | "ALL">("ALL");

  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);

  useEffect(() => {
    if (!bills) return;

    const filteredBills =
      type != "ALL"
        ? bills.filter((bill) => {
            return bill.type === type;
          })
        : bills;

    const finalBills = search
      ? filteredBills.filter((bill: Bill) => {
          return bill.payee.toLowerCase().includes(search.toLowerCase());
        })
      : filteredBills;
    console.log(finalBills);

    setFilteredBills(finalBills);
  }, [bills, type, search]);

  if (isLoading) return "Loading...";
  if (error || !bills) return "Unable to load bills.";

  const totalPages = Math.ceil(filteredBills.length / 10);

  return (
    <div className="flex flex-col gap-[32px] pb-[20%] h-fit xl:pb-[24px] xl:pt-[24px] xl:pl-[16px] xl:pr-[48px] w-full xl:ml-[var(--sidebar-width)]">
      <p className="text-gray-900 text-preset-1"> Recurring Bills</p>{" "}
      <div className="flex flex-col gap-[32px] xl:flex-row">
        <div className="w-full flex flex-col gap-[16px] md:flex-row xl:flex-col xl:flex-[1] xl:h-fit">
          <Summary bills={bills} />
        </div>
        <div className="bg-white flex flex-col gap-[16px] h-full p-[32px] rounded-[12px] md:gap-x-[0px] md:grid md:grid-cols-[5fr_3fr_2fr] xl:flex-[2]">
          <BillToggles
            state={{ search, type }}
            stateSetters={{ setSearch, setType }}
          />
          <div className="relative hidden md:grid md:grid-cols-[5fr_3fr_2fr] col-span-full after:absolute after:left-0 after:bottom-[-8px] after:w-full after:content-[''] after:bg-gray-300 after:h-[1px]">
            <p className="text-preset-5 text-gray-500">Bill Title</p>
            <p className="text-preset-5 text-gray-500">Due Date</p>
            <p className="text-preset-5 text-gray-500 text-end">Amount</p>
          </div>

          <span className="mt-[16px] md:m-0"></span>
          <BillList bills={filteredBills} page={page} />
          <span className="mb-[16px] md:m-0"></span>

          <PaginationFooter
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
