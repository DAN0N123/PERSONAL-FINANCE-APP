import React from "react";
import useSWR from "swr";
import titleCase from "../../utils/titleCase";
import { Link } from "react-router-dom";
import { Pot } from "../../types/Pot";

export default function Pots() {
  const {
    data: pots,
    error,
    isLoading,
  } = useSWR<Omit<Pot, "target">[]>("http://localhost:3000/pots/get");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load pots.</div>;

  const total =
    pots && Math.round(pots.reduce((acc, pot) => acc + pot.amount, 0));

  return (
    <div className="rounded-[12px] flex flex-col gap-[12px] bg-white pt-[20px] pr-[24px] pb-[20px] pl-[24px] xl:pt-[30px] xl:pb-[30px] xl:pr-[36px] xl:pl-[36px]">
      <div className="flex w-full justify-between items-center">
        <p className="text-preset-2 text-gray-900"> Pots </p>
        <Link
          to={"/pots"}
          className="text-preset-4 text-gray-500 flex gap-[16px]"
        >
          <p>See Details</p>
          <img src="../../mentor-starter-code/assets/images/icon-caret-right.svg" />
        </Link>
      </div>
      <div className="flex flex-col gap-[12px] md:flex-row md:gap-[24px]">
        <div className="bg-beige-100 rounded-[12px] flex justify-start gap-[16px] p-4 md:flex-[1]">
          <img
            src="../../mentor-starter-code/assets/images/icon-pot.svg"
            className="w-[34px] h-auto"
          />
          <div className="flex flex-col gap-[12px] ">
            <p className="text-preset-4 text-gray-500">Total Saved</p>
            <p className="text-preset-1 text-gray-900">${total}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[12px] md:flex-[2]">
          {pots?.slice(0, 4).map(({ name, amount, color }, index) => {
            const bgColor = `before:bg-${color}`;
            return (
              <div
                key={index + name}
                className={`flex flex-col items-start gap-[8px] pl-[12px] relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[4px] before:rounded-full ${bgColor}`}
              >
                <p className="text-preset-5 text-gray-500">{titleCase(name)}</p>
                <p className="text-preset-4-bold text-gray-900">${amount}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
