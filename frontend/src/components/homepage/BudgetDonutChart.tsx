import { PieChart, Pie, Cell } from "recharts";
import React from "react";

type Expense = { category: string; amount: number, id: number, userId: number};

type Data = Expense[];

type Colors = string[];

interface DonutTypes {
  data: Data;
  width: number;
  height: number;
  spent: number;
  limit: number;
  innerRadius?: number;
  outerRadius?: number;
  colors: Colors;
  text?: boolean;
  className?: string;
}

function BudgetDonutChart({
  data,
  width,
  height,
  spent,
  limit,
  colors,
  innerRadius,
  outerRadius,
  text = true,
  className,
}: DonutTypes) {
  return (
    <div
      className={`relative w-[240px] h-[240px] grid place-content-center ${className}`}
    >
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          dataKey="amount"
          startAngle={90}
          endAngle={-270}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>

      {/* Center label */}
      {text && (
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <p className="text-preset-1">${spent}</p>
          <p className="text-gray-500 text-preset-5">of ${limit} limit</p>
        </div>
      )}
    </div>
  );
}

export default BudgetDonutChart;
