import BudgetDonutChart from "./BudgetDonutChart";

const expenses = [
  { title: "Entertainment", value: 50 },
  { title: "Bills", value: 550 },
  { title: "Dining Out", value: 95 },
  { title: "Personal Care", value: 130 },
];

const colors = {
  0: "before:bg-green",
  1: "before:bg-cyan",
  2: "before:bg-navy",
  3: "before:bg-yellow",
};

export default function Budgets() {
  const pieChartColors = ["#277C78", "#82C9D7", "#F2CDAC", "#626070"];
  return (
    <div className="rounded-[12px] flex flex-col gap-[24px] bg-white pt-[20px] pr-[24px] pb-[20px] pl-[24px]">
      <div className="flex w-full justify-between items-center">
        <p className="text-preset-2 text-gray-900"> Budgets </p>
        <div className="text-preset-4 text-gray-500 flex gap-[16px]">
          <p>See Details</p>
          <img src="../../mentor-starter-code/assets/images/icon-caret-right.svg" />
        </div>
      </div>

      <div className="relative grid place-content-center">
        <BudgetDonutChart
          limit={975}
          spent={338}
          colors={pieChartColors}
          data={expenses}
          width={240}
          height={240}
          innerRadius={95}
          outerRadius={120}
        />
        <div className="absolute inset-0 w-full grid place-content-center">
          <BudgetDonutChart
            limit={975}
            spent={338}
            colors={pieChartColors}
            data={expenses}
            width={240}
            height={240}
            text={false}
            innerRadius={80}
            outerRadius={95}
            className="opacity-[0.8]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[12px]">
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
  );
}
