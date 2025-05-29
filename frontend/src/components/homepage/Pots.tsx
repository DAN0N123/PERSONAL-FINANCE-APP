const expenses = [
  { title: "Savings", value: "159" },
  { title: "Gift", value: "40" },
  { title: "Concert Ticket", value: "110" },
  { title: "New Laptop", value: "10" },
];

const colors = {
  0: "before:bg-green",
  1: "before:bg-cyan",
  2: "before:bg-navy",
  3: "before:bg-yellow",
};

export default function Pots() {
  return (
    <div className="rounded-[12px] flex flex-col gap-[12px] bg-white pt-[20px] pr-[24px] pb-[20px] pl-[24px] xl:pt-[30px] xl:pb-[30px] xl:pr-[36px] xl:pl-[36px]">
      <div className="flex w-full justify-between items-center">
        <p className="text-preset-2 text-gray-900"> Pots </p>
        <div className="text-preset-4 text-gray-500 flex gap-[16px]">
          <p>See Details</p>
          <img src="../../mentor-starter-code/assets/images/icon-caret-right.svg" />
        </div>
      </div>
      <div className="flex flex-col gap-[12px] md:flex-row md:gap-[24px]">
        <div className="bg-beige-100 rounded-[12px] flex justify-start gap-[16px] p-4 md:flex-[1] md:gap-[32px]">
          <img
            src="../../mentor-starter-code/assets/images/icon-pot.svg"
            className="w-[34px] h-auto"
          />
          <div className="flex flex-col gap-[12px] ">
            <p className="text-preset-4 text-gray-500">Total Saved</p>
            <p className="text-preset-1 text-gray-900">$850</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[12px] md:flex-[2]">
          {expenses.map(({ title, value }, index) => {
            const bgColor = colors[index];
            return (
              <div
                className={`flex flex-col items-start gap-[8px] pl-[12px] relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[4px] before:rounded-full ${bgColor}`}
              >
                <p className="text-preset-5 text-gray-500">{title}</p>
                <p className="text-preset-4-bold text-gray-900">${value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
