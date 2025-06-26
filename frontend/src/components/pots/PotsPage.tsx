import { useState, useEffect } from "react";
import useSWR from "swr";
import PotTile from "./PotTile";
import { Pot } from "../../types/Pot";
import PotsForm from "./PotsForm";
import { Color } from "../../types/Color";
export default function PotsPage() {
  const [modalActive, setModalActive] = useState(false);
  const {
    data: pots,
    isLoading,
    error,
  } = useSWR(`http://localhost:3000/pots/get`);

  const [color, setColor] = useState<Color>("Green");
  const [name, setName] = useState<string>("");
  const [target, setTarget] = useState<number | string>("");
  const [usedColors, setUsedColors] = useState<Lowercase<Color>[]>();

  useEffect(() => {
    if (pots) {
      let usedColorsArr: Lowercase<Color>[] = [];
      pots.forEach((pot: Pot) => {
        return usedColorsArr.push(pot.color);
      });
      setUsedColors(usedColorsArr);
    }
  }, [pots]);

  if (isLoading || !pots) return <div>Loading...</div>;
  if (error) return <div>Failed to load pots.</div>;

  async function addPot(e) {
    e.preventDefault();
    const data = {
      name: name,
      color: color.toLowerCase(),
      target: target,
    };
    const response = await fetch("http://localhost:3000/pots/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!result.ok) return console.error("error");

    setModalActive(false);
    window.location.reload();
  }

  return (
    <div className="flex flex-col gap-[32px] pb-[20%] h-fit xl:pb-[24px] xl:pt-[24px] xl:pl-[16px] xl:pr-[48px] w-full xl:ml-[var(--sidebar-width)]">
      {modalActive && (
        <PotsForm
          title={"Add New Pot"}
          buttonText={"Add Pot"}
          submit={addPot}
          disableModal={() => setModalActive(false)}
          nameVal={name}
          usedColors={usedColors}
          colorVal={color}
          targetVal={target}
          setColor={setColor}
          setName={setName}
          setTarget={setTarget}
        />
      )}
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
      <div className="flex flex-col gap-[32px] h-fit xl:grid xl:grid-cols-2">
        {pots.map((pot: Pot) => {
          return <PotTile data={pot} usedColors={usedColors}></PotTile>;
        })}
      </div>
    </div>
  );
}
