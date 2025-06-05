import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface DropdownProps<T extends string> {
  options: T[];
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

export default function Dropdown<T extends string>({
  children,
  options,
  value,
  setValue,
}: DropdownProps<T>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        sx={{
          minWidth: 0,
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
              {option}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
