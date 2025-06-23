import { useState, useEffect } from "react";
import useSWR from "swr";
import PotTile from "./PotTile";
import { Pot } from "../../types/Pot";

export default function PotsPage() {
  const [modalActive, setModalActive] = useState(false);
  const {
    data: pots,
    isLoading,
    error,
  } = useSWR(`http://localhost:3000/pots/get`);
  if (isLoading || !pots) return <div>Loading...</div>;
  if (error) return <div>Failed to load pots.</div>;

  return (
    <div className="flex flex-col gap-[32px] pb-[20%] md:pb-[10%] h-fit xl:pb-[24px] xl:pt-[24px] xl:pl-[16px] xl:pr-[48px] w-full xl:ml-[var(--sidebar-width)]">
      <div className="flex w-full justify-between items-center">
        <p className="text-gray-900 text-preset-1"> Pots</p>{" "}
        <button
          className="bg-gray-900 rounded-[8px] p-[16px] text-preset-4-bold text-white"
          onClick={() => {
            setModalActive(true);
          }}
        >
          + Add New Pot
        </button>
      </div>
      {pots.map((pot: Pot) => {
        return <PotTile data={pot}></PotTile>;
      })}
    </div>
  );
}
