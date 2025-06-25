import { useState, Dispatch, SetStateAction } from "react";
import isNumberKey from "../../utils/isNumberKey";

type PotData = {
  name: string;
  id: number;
  amount: number;
  target: number;
  color: string;
};

type FormProps = {
  setModal: Dispatch<SetStateAction<string>>;
  potData: PotData;
};

export default function WithdrawPot({ setModal, potData }: FormProps) {
  const [value, setValue] = useState<number | string>("");
  const { id, amount, target, color, name } = potData;

  const newPercentage = Number((Number(value) / target).toFixed(2)) * 100;
  const originalPercentage = Number((amount / target).toFixed(2)) * 100;

  const originalBarWidth =
    originalPercentage - newPercentage > 0
      ? `${originalPercentage - newPercentage}%`
      : "0%";

  const newBarWidth =
    newPercentage + originalPercentage < 0
      ? `${originalPercentage}%`
      : `${newPercentage}%`;
  const bgColor = `bg-${color}`;
  const textColor = `text-${color}`;
  const isLimit = originalPercentage - newPercentage < 100;

  async function addToPot(e) {
    e.preventDefault();
    const data = {
      id: id,
      amount: value,
    };
    const response = await fetch("http://localhost:3000/pots/withdrawPot", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!result.ok) return console.log("error");
    setModal("");
    window.location.reload();
  }

  return (
    <>
      <form
        onSubmit={addToPot}
        className="fixed top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-[90%] rounded-[12px] pt-[24px] pb-[24px] pl-[20px] pr-[20px] bg-white z-[101] h-fit flex flex-col gap-[20px] xl:ml-[var(--sidebar-width)] xl:w-[50%]"
      >
        <div className="flex w-full justify-between items-center">
          <div className="text-gray-900 text-preset-2">
            Withdraw from '{name}'?
          </div>
          <button
            onClick={() => {
              setModal("");
            }}
          >
            <img
              src="../../../mentor-starter-code/assets/images/icon-close-modal.svg"
              className="w-[32px] h-[32px]"
            />
          </button>
        </div>
        <p className="text-preset-4 text-gray-500">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus
          hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
        </p>
        <div className="flex flex-col gap-[16px] w-full">
          <div>
            <div className="flex w-full justify-between items-center">
              <p className="text-preset-4 text-gray-500">New Amount</p>
              <p className="text-preset-1 text-gray-900">
                ${(amount - Number(value)).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="w-full bg-beige-100 rounded-[4px] h-[8px] flex">
            <div
              className={`bg-gray-900 rounded-l-[4px] min-h-full mr-[4px] ${
                isLimit && "mr-[0]"
              }`}
              style={{ width: originalBarWidth }}
            ></div>
            <div
              className={`${bgColor} rounded-r-[4px] min-h-full ${
                isLimit && "rounded-[4px]"
              }`}
              style={{ width: newBarWidth }}
            ></div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className={`${textColor} text-preset-5-bold`}>
              {originalPercentage - newPercentage}%
            </p>
            <p className="text-preset-5 text-gray-500">Target of ${target}</p>
          </div>

          <div className="flex flex-col w-full gap-[8px]">
            <p className="text-preset-5-bold text-gray-500"> Amount to Add</p>
            <div className="relative flex items-baseline w-full pl-[20px] pr-[20px] pt-[12px] pb-[12px] justify-start gap-[8px] rounded-[8px] border-[1px] border-gray-500">
              <p className="text-preset-4 text-beige-500"> $</p>
              <input
                type="text"
                required
                inputMode="numeric"
                value={value}
                onKeyPress={(e) => {
                  if (!isNumberKey(e)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    const numericValue = parseFloat(e.target.value) || 0;
                    if (numericValue <= amount) {
                      setValue(numericValue);
                    } else {
                      setValue(amount);
                    }
                  }
                }}
                placeholder="e.g. 2000"
                className="placeholder:text-beige-500 text-gray-900 flex items-center hideIncrementer focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          className="bg-gray-900 rounded-[8px] p-[16px] text-preset-4-bold text-white"
          type="submit"
        >
          Confirm Withdrawal
        </button>
      </form>
      <div className="fixed inset-0 bg-[#000000] opacity-[0.15] z-[100] mt-[-24px] ml-[-24px] mr-[-20px]"></div>
    </>
  );
}
