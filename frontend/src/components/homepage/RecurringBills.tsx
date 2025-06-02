import React from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

type StatusType = "DUE" | "UPCOMING" | "PAID";

interface BillType {
  id: number;
  amount: number;
  status: StatusType;
  userId: number;
}

export default function Bills() {
  const {
    data: bills,
    error,
    isLoading,
  } = useSWR<BillType[]>("http://localhost:3000/bills/get", fetcher);

  if (error) return "an error has occured";
  if (isLoading) return "Loading...";

  const paidBills = bills?.filter((bill) => bill.status === "PAID");
  const dueBills = bills?.filter((bill) => bill.status === "DUE");
  const upcomingBills = bills?.filter((bill) => bill.status === "UPCOMING");

  return (
    <div className="rounded-[12px] flex flex-col gap-[12px] bg-white pt-[20px] pr-[24px] pb-[20px] pl-[24px] xl:gap-[36px] xl:h-full xl:pt-[30px] xl:pb-[30px] xl:pr-[36px] xl:pl-[36px] ">
      <div className="flex w-full justify-between items-center">
        <p className="text-preset-2 text-gray-900"> Recurring Bills </p>
        <div className="text-preset-4 text-gray-500 flex gap-[16px]">
          <p>See Details</p>
          <img src="../../mentor-starter-code/assets/images/icon-caret-right.svg" />
        </div>
      </div>
      <div className="flex flex-col gap-[12px] xl:gap-[24px]">
        <div className="relative isolate flex flex-col overflow-y-clip">
          <div className="absolute inset-0 w-full h-full bg-green translate-x-[-5px] z-10 rounded-[8px] z-10"></div>
          <div className="bg-beige-100 flex justify-between pl-[16px] pr-[16px] pt-[20px] pb-[20px] rounded-[8px] z-20">
            <p className="text-preset-4 text-gray-500">Paid Bills</p>
            <p className="text-preset-4-bold text-gray-900">
              {" "}
              $
              {paidBills &&
                Math.round(
                  paidBills.reduce((acc, bill) => acc + bill.amount, 0)
                )}
            </p>
          </div>
        </div>
        <div className="relative isolate flex flex-col overflow-y-clip">
          <div className="absolute inset-0 w-full h-full bg-yellow translate-x-[-5px] z-10 rounded-[8px] z-10"></div>
          <div className="bg-beige-100 flex justify-between pl-[16px] pr-[16px] pt-[20px] pb-[20px] rounded-[8px] z-20">
            <p className="text-preset-4 text-gray-500">Total Upcoming</p>
            <p className="text-preset-4-bold text-gray-900">
              {" "}
              $
              {upcomingBills &&
                Math.round(
                  upcomingBills.reduce((acc, bill) => acc + bill.amount, 0)
                )}
            </p>
          </div>
        </div>
        <div className="relative isolate flex flex-col overflow-y-clip">
          <div className="absolute inset-0 w-full h-full bg-cyan translate-x-[-5px] z-10 rounded-[8px] z-10"></div>
          <div className="bg-beige-100 flex justify-between pl-[16px] pr-[16px] pt-[20px] pb-[20px] rounded-[8px] z-20">
            <p className="text-preset-4 text-gray-500">Due Soon</p>
            <p className="text-preset-4-bold text-gray-900">
              {" "}
              $
              {dueBills &&
                Math.round(
                  dueBills.reduce((acc, bill) => acc + bill.amount, 0)
                )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
