import { Pot } from "../../types/Pot";
import { useState } from "react";

import React from "react";

//MUI
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

type PotProps = {
  data: Pot;
};

export default function PotTile({ data }: PotProps) {
  const [modal, setModal] = useState("");
  const { id, name, amount, color, target } = data;
  const bgColor = `bg-${color}`;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const actions = ["Edit Pot", "Delete Pot", "Add to Pot", "Withdraw Pot"];

  let progress = Math.round((amount / target) * 100) / 100;
  const barWidth = progress < 1 ? `${progress * 100}%` : "100%";

  return (
    <div className="flex flex-col gap-[24px] w-full bg-white pt-[24px] pb-[24px] pl-[20px] pr-[20px] rounded-[12px]">
      {modal === "Edit Budget" && <></>}
      {modal === "Delete Budget" && <></>}
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-[12px]">
          <div className={`rounded-[50%] w-[16px] h-[16px] ${bgColor}`}></div>

          <p className="text-preset-2 tex-gray-900">{name}</p>
        </div>
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
                    action === "Delete Budget" ? "hsl(7, 53%, 50%)" : undefined,
                }}
              >
                {action}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
      <div className="flex w-full justify-between items-center">
        <p className="text-preset-4 text-gray-500">Total Saved</p>
        <p className="text-preset-1 text-gray-900">${amount.toFixed(2)}</p>
      </div>
      <div className="flex flex-col gap-[13px]">
        <div className="w-full bg-beige-100 rounded-[4px] p-[4px] h-[32px]">
          <div
            className={`${bgColor} rounded-[4px] h-full`}
            style={{ width: barWidth }}
          ></div>
        </div>
        <div className="flex w-full justify-between items-center">
          <p className="text-preset-5-bold text-gray-500">{`${
            progress * 100
          }%`}</p>
          <p className="text-preset-5 text-gray-500">Target of {target}</p>
        </div>
      </div>
    </div>
  );
}
