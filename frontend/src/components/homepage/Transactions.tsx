const transactions = [
  {
    sender: "Emma Richardson",
    amount: "75.50",
    income: true,
    date: "19 Aug 2024",
  },
  {
    sender: "Savory Bites Bistro",
    amount: "55.50",
    income: false,
    date: "19 Aug 2024",
  },
  {
    sender: "Daniel Carter",
    amount: "42.30",
    income: false,
    date: "18 Aug 2024",
  },
  { sender: "Sun Park", amount: "120", income: true, date: "17 Aug 2024" },
  {
    sender: "Urban Services Hub",
    amount: "65.00",
    income: false,
    date: "17 Aug 2024",
  },
];

export default function Transactions() {
  return (
    <div className="rounded-[12px] flex flex-col gap-[32px] bg-white pt-[20px] pr-[24px] pb-[20px] pl-[24px] xl:pt-[30px] xl:pb-[30px] xl:pr-[36px] xl:pl-[36px]">
      <div className="flex w-full justify-between items-center">
        <p className="text-preset-2 text-gray-900"> Transactions </p>
        <div className="text-preset-4 text-gray-500 flex gap-[16px]">
          <p>View All</p>
          <img src="../../mentor-starter-code/assets/images/icon-caret-right.svg" />
        </div>
      </div>
      {transactions.map(({ sender, amount, income, date }, index) => {
        const color = income ? "text-green" : "text-gray-900";
        const beforeVisibility =
          index === transactions.length - 1 && "before:hidden";
        return (
          <div
            className={`flex justify-between items-center relative before:absolute pb-[12px] before:w-full before:left-0 before:bottom-0 before:bg-gray-300 before:h-[1px] ${beforeVisibility}`}
          >
            <div className="flex gap-[8px] items-center">
              <div className="bg-green w-[32px] h-[32px] rounded-[50%]"></div>
              <p className="text-gray-900 text-preset-4-bold"> {sender} </p>
            </div>
            <div className="flex flex-col gap-[8px]">
              <p className={`text-preset-4-bold ${color}`}>
                {" "}
                {income ? "+" : "-"}${amount}
              </p>
              <p className="text-preset-5 text-grey-500">{date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
