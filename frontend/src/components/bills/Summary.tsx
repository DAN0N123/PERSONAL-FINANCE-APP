import Tile from "../reusable/Tile";
import Icon from "../reusable/Icon";
import { Bill } from "../../types/Bill";

export default function Summary({ bills }: { bills: Bill[] }) {
  const paidBills = bills.filter((bill) => bill.status === "PAID");
  const paidBillsSum = Number(
    paidBills.reduce((acc, bill) => acc + bill.amount, 0).toFixed(2)
  );

  const upcomingBills = bills.filter((bill) => bill.status === "UPCOMING");
  const upcomingBillsSum = Number(
    upcomingBills.reduce((acc, bill) => acc + bill.amount, 0).toFixed(2)
  );

  const dueSoonBills = bills.filter((bill) => bill.status === "DUE");
  const dueSoonBillsSum = Number(
    dueSoonBills.reduce((acc, bill) => acc + bill.amount, 0).toFixed(2)
  );
  return (
    <>
      <Tile
        title="Total bills"
        value={String(upcomingBillsSum + dueSoonBillsSum)}
        variant="dark"
        className="flex-1 flex-col !items-start"
      >
        <Icon
          variant="bills"
          width={"40px"}
          height={"40px"}
          className="p-[2px]"
        />
      </Tile>
      <div className="flex flex-col gap-[20px] p-[20px] bg-white rounded-[12px] md:flex-1">
        <p className="text-preset-3 text-gray-900">Summary</p>
        <div className="flex flex-col gap-[16px]">
          <div className="relative flex w-full justify-between items-center after:absolute after:left-0 after:bottom-[-8px] after:w-full after:content-[''] after:bg-gray-100 after:h-[1px]">
            <p className="text-preset-5 text-gray-500">Paid Bills</p>
            <p className="text-preset-5-bold text-gray-900">
              {paidBills.length} ($
              {paidBillsSum})
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="relative flex w-full justify-between items-center after:absolute after:left-0 after:bottom-[-8px] after:w-full after:content-[''] after:bg-gray-100 after:h-[1px]">
            <p className="text-preset-5 text-gray-500">Total Upcoming</p>
            <p className="text-preset-5-bold text-gray-900">
              {upcomingBills.length} ($
              {upcomingBillsSum})
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex w-full justify-between items-center">
            <p className="text-preset-5 text-red">Due Soon</p>
            <p className="text-preset-5-bold text-red">
              {dueSoonBills.length} (${dueSoonBillsSum})
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
