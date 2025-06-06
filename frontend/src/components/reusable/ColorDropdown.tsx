import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Color } from "../../types/Color";

interface ColorDropdownProps {
  usedColors: string[];
  options: Color[];
  value: Color;
  setValue: React.Dispatch<React.SetStateAction<Color>>;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

const selectedColors = {
  Green: "hsl(177, 55%, 32%)",
  Yellow: "hsl(24, 70%, 87%)",
  Cyan: "hsl(192, 59%, 85%)",
  Navy: "hsl(240, 8%, 41%)",
  Red: "hsl(7, 53%, 50%)",
  Purple: "hsl(260, 30%, 59%)",
  Turquoise: "hsl(180, 16%, 42%)",
};

export default function ColorDropdown({
  usedColors,
  children,
  options,
  value,
  setValue,
}: ColorDropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-full">
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
        {children}
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
              borderRadius: "8px", // <- This applies directly to the Paper component
            },
          },
        }}
      >
        {options.map((option, index) => {
          const beforeVisibility =
            index === options.length - 1 && "before:hidden";
          const highlighted = option === value;
          return (
            <MenuItem
              key={option}
              onClick={() => {
                setValue(option);
                handleClose();
              }}
              className={`before:absolute pb-[12px] before:w-[80%] before:left-[10%] before:bottom-0 before:bg-gray-100 before:h-[1px] ${beforeVisibility} `}
              sx={{
                fontWeight: highlighted ? "bold" : "normal",
              }}
            >
              {usedColors.includes(option.toLowerCase()) ? (
                <div className="flex justify-between items-center  w-[200px]">
                  <div className="flex gap-[12px] items-center">
                    <div
                      className="rounded-[50%] w-[16px] h-[16px] opacity-[0.25]"
                      style={{ backgroundColor: selectedColors[option] }}
                    ></div>
                    <p className="text-nowrap text-gray-500 text-preset-4">
                      {option}
                    </p>
                  </div>
                  <p className="text-preset-5 text-gray-500">Already used</p>
                </div>
              ) : (
                <div className="flex gap-[12px] items-center  w-[200px]">
                  <div
                    className="rounded-[50%] w-[16px] h-[16px]"
                    style={{ backgroundColor: selectedColors[option] }}
                  ></div>
                  <p className="text-nowrap text-gray-900 text-preset-4">
                    {option}
                  </p>
                </div>
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
