import { useEffect, useState } from "react";
import React from "react";
import { Budget } from "../../types/Budget";
import { Transaction } from "../../types/Transaction";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Color } from "../../types/Color";

interface SpendingTypes {
  usedColors: string[];
  budget: Budget | undefined;
  transactions: Transaction[];
}

import { DateTime } from "luxon";
import BudgetForm from "./BudgetForm";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

export default function Spending({
  budget,
  transactions,
  usedColors,
}: SpendingTypes) {
  const [modal, setModal] = useState("");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState<number | string>("");
  const [newTagColor, setNewTagColor] = useState<Color | string>("");

  useEffect(() => {
    if (budget) {
      setNewCategory(budget.category);
      setNewAmount(budget.amount);
      setNewTagColor(capitalizeFirstLetter(budget.color));
    }
  }, []);

  const actions = ["Edit Budget", "Delete Budget"];

  const bgColor = `bg-${budget?.color}`;

  if (!budget || !transactions) return;

  const transactionsTotal = Math.abs(
    transactions.reduce((acc, current) => acc + current.amount, 0)
  );

  let progress = Math.round((transactionsTotal / budget.amount) * 100) / 100;
  const barWidth = progress < 1 ? `${progress * 100}%` : "100%";

  async function editBudget(e) {
    e.preventDefault();
    const data = {
      id: budget?.id,
      category: newCategory,
      color: newTagColor.toLowerCase(),
      amount: newAmount,
    };
    const response = await fetch("http://localhost:3000/budgets/edit", {
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

  async function deleteBudget() {
    const response = await fetch(
      `http://localhost:3000/budgets/${budget?.id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    if (!result.ok) return console.log("error");

    setModal("");
    window.location.reload();
  }

  return (
    <div className="flex flex-col gap-[24px] w-full bg-white pt-[24px] pb-[24px] pl-[20px] pr-[20px] rounded-[12px]">
      {modal === "Edit Budget" && (
        <BudgetForm
          title={"Edit Budget"}
          submit={editBudget}
          disableModal={() => setModal("")}
          categoryVal={newCategory}
          colorVal={newTagColor}
          amountVal={newAmount}
          setCategory={setNewCategory}
          setAmount={setNewAmount}
          setColor={setNewTagColor}
          usedColors={usedColors}
        />
      )}
      {modal === "Delete Budget" && (
        <>
          <div className="fixed top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-[90%] rounded-[12px] pt-[24px] pb-[24px] pl-[20px] pr-[20px] bg-white z-[101] h-fit flex flex-col gap-[20px]">
            <div className="flex w-full justify-between items-center">
              <div className="text-gray-900 text-preset-2">
                Delete '{budget.category}'?
              </div>
              <button onClick={() => setModal("")}>
                <img
                  src="../../../mentor-starter-code/assets/images/icon-close-modal.svg"
                  className="w-[32px] h-[32px]"
                />
              </button>
            </div>
            <p className="text-preset-4 text-gray-500">
              Are you sure you want to delete this budget? This action cannot be
              reversed, and all the data inside it will be removed forever.
            </p>

            <button
              className="bg-red rounded-[8px] p-[16px] text-preset-4-bold text-white"
              onClick={(e) => {
                e.preventDefault();
                deleteBudget();
                setModal("");
              }}
            >
              Yes, Confirm Deletion
            </button>
            <button
              className="bg-white rounded-[8px] p-[16px] text-preset-4-bold text-gray-500"
              onClick={(e) => {
                e.preventDefault();
                setModal("");
              }}
            >
              No, I want to go back
            </button>
          </div>
          <div className="fixed inset-0 bg-[#000000] opacity-[0.15] z-[100] mt-[-24px] ml-[-24px] mr-[-20px]"></div>
        </>
      )}
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-[12px]">
          <div className={`rounded-[50%] w-[16px] h-[16px] ${bgColor}`}></div>

          <p className="text-preset-2 tex-gray-900">{budget.category}</p>
        </div>
        <div className="w-fit">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            sx={{
              minWidth: 0,
              width: "100%",
              padding: 0,
              textTransform: "none",
            }}
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <img
              src="../../../mentor-starter-code/assets/images/icon-ellipsis.svg"
              alt=""
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
              paper: {
                sx: {
                  borderRadius: "8px",
                },
              },
            }}
          >
            {actions.map((action, index) => {
              const beforeVisibility =
                index === actions.length - 1 && "before:hidden";
              return (
                <MenuItem
                  key={action}
                  onClick={() => {
                    setModal(action);
                    handleClose();
                  }}
                  className={`before:absolute pb-[12px] before:w-[80%] before:left-[10%] before:bottom-0 before:bg-gray-100 before:h-[1px] ${beforeVisibility} `}
                  style={{
                    color:
                      action === "Delete Budget"
                        ? "hsl(7, 53%, 50%)"
                        : undefined,
                  }}
                >
                  {action}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
      </div>
      <p className="text-gray-500 text-preset-4">Maximum of ${budget.amount}</p>
      <div className="w-full bg-beige-100 rounded-[4px] p-[4px] h-[32px]">
        <div
          className={`${bgColor} rounded-[4px] h-full`}
          style={{ width: barWidth }}
        ></div>
      </div>
      <div className="flex justify-between">
        <div
          className={`flex-1 pl-[16px] relative before:content-[''] before:absolute before:top-[10%] before:bottom-[10%] before:left-0 before:w-[4px] before:rounded-full before:${bgColor}`}
        >
          <div className="flex flex-col">
            <p className="text-preset-5 text-gray-500">Spent</p>
            <p className="text-preset-4-bold text-gray-900">
              ${Math.round(transactionsTotal * 100) / 100}
            </p>
          </div>
        </div>
        <div
          className={`flex-1 pl-[16px] relative before:content-[''] before:absolute before:top-[10%] before:bottom-[10%] before:left-0 before:w-[4px] before:rounded-full before:bg-beige-100`}
        >
          <div className="flex flex-col">
            <p className="text-preset-5 text-gray-500">Free</p>
            <p className="text-preset-4-bold text-gray-900">
              {budget.amount < transactionsTotal
                ? `-$${Math.abs(
                    Math.round((budget.amount - transactionsTotal) * 100) / 100
                  )}`
                : `$${
                    Math.round((budget.amount - transactionsTotal) * 100) / 100
                  }`}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-beige-100 rounded-[12px] p-[16px] flex flex-col gap-[20px]">
        <div className="flex w-full justify-between items-center">
          <p className="text-gray-900 text-preset-3">Latest Spending</p>
          <div className="flex gap-[12px] items-center">
            <p className="text-gray-500 text-preset-4">See all</p>
            <img
              src="../../../mentor-starter-code/assets/images/icon-caret-right.svg"
              className="w-[12px] h-[12px]"
            />
          </div>
        </div>
        {transactions
          .slice(0, 3)
          .map(({ counterparty, amount, date }, index) => {
            const color = amount > 0 ? "text-green" : "text-gray-900";
            const beforeVisibility = index === 2 && "before:hidden";
            const dt = DateTime.fromISO(date);
            const formatted = dt.toFormat("d LLLL yyyy");

            const colors = {
              0: "bg-green",
              1: "bg-cyan",
              2: "bg-navy",
              3: "bg-yellow",
            };

            return (
              <>
                <div
                  key={index}
                  className={`flex justify-between items-center relative before:absolute before:w-full before:left-0 before:bottom-[-10px] before:bg-gray-300 before:h-[1px] ${beforeVisibility}`}
                >
                  <div className="flex gap-[8px] items-center">
                    <div
                      className={`hidden md:block rounded-[50%] w-[32px] h-[32px] ${
                        colors[index % Object.keys(colors).length]
                      }`}
                    />
                    <p className="text-gray-900 text-preset-4-bold">
                      {" "}
                      {counterparty.name}{" "}
                    </p>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className={`text-preset-4-bold ${color} text-end`}>
                      {" "}
                      {amount > 0 ? "+" : "-"}${Math.abs(amount)}
                    </p>
                    <p className="text-preset-5 text-grey-500">{formatted}</p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}
