import React from "react";
import { Pot } from "../../types/Pot";
import { useState, useEffect } from "react";
import { Color } from "../../types/Color";
import PotsForm from "./PotsForm";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

//MUI
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import DeletionDialog from "../reusable/DeletionDialog";
import AddToPot from "./AddToPot";
import WithdrawPot from "./WithdrawPot";

export default function PotTile({
  data,
  usedColors,
}: {
  data: Pot;
  usedColors?: Lowercase<Color>[];
}) {
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

  const [newName, setNewName] = useState("");
  const [newTarget, setNewTarget] = useState<number | string>("");
  const [newTagColor, setNewTagColor] = useState<Color | string>("");

  useEffect(() => {
    if (data) {
      setNewName(name);
      setNewTarget(target);
      setNewTagColor(capitalizeFirstLetter(color));
    }
  }, [data]);

  const actions = ["Edit Pot", "Delete Pot", "Add to Pot", "Withdraw Pot"];

  let progress = Number((amount / target).toFixed(2));
  const barWidth = progress < 1 ? `${progress * 100}%` : "100%";

  async function editPot(e) {
    e.preventDefault();
    const data = {
      id: id,
      name: newName,
      color: newTagColor.toLowerCase(),
      target: newTarget,
    };
    const response = await fetch("http://localhost:3000/pots/edit", {
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

  async function deletePot() {
    const response = await fetch(`http://localhost:3000/pots/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!result.ok) return console.log("error");

    setModal("");
    window.location.reload();
  }

  return (
    <div className="flex flex-col gap-[24px] w-full bg-white pt-[24px] pb-[24px] pl-[20px] pr-[20px] rounded-[12px]">
      {modal === "Edit Pot" && (
        <PotsForm
          title={"Edit Pot"}
          buttonText={"Save Changes"}
          submit={editPot}
          disableModal={() => setModal("false")}
          nameVal={newName}
          usedColors={usedColors}
          colorVal={capitalizeFirstLetter(newTagColor)}
          targetVal={newTarget}
          setColor={setNewTagColor}
          setName={setNewName}
          setTarget={setNewTarget}
        />
      )}
      {modal === "Delete Pot" && (
        <DeletionDialog title={name} setModal={setModal} action={deletePot} />
      )}
      {modal === "Add to Pot" && (
        <AddToPot setModal={setModal} potData={{ id, amount, target, color }} />
      )}
      {modal === "Withdraw Pot" && (
        <WithdrawPot
          setModal={setModal}
          potData={{ id, amount, target, color, name }}
        />
      )}
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-[12px]">
          <div className={`rounded-[50%] w-[16px] h-[16px] ${bgColor}`}></div>

          <p className="text-preset-2 tex-gray-900">{name}</p>
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
                      action === "Delete Pot" ? "hsl(7, 53%, 50%)" : undefined,
                  }}
                >
                  {action}
                </MenuItem>
              );
            })}
          </Menu>
        </div>
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
          <p className="text-preset-5-bold text-gray-500">{`${(
            progress * 100
          ).toFixed(2)}%`}</p>
          <p className="text-preset-5 text-gray-500">Target of {target}</p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-[16px]">
        <button className="text-preset-4-bold text-gray-900 bg-beige-100 p-[16px] rounded-[8px] w-full flex justify-center items-center">
          + Add Money
        </button>
        <button className="text-preset-4-bold text-gray-900 bg-beige-100 p-[16px] rounded-[8px] w-full flex justify-center items-center">
          Withdraw
        </button>
      </div>
    </div>
  );
}
