import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface MenuProps {
  children: React.ReactNode;
  options: string[];
  width?: number;
  height?: number;
}

export default function Dropdown({
  children,
  options,
  width,
  height,
}: MenuProps) {
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
        sx={{ minWidth: width, padding: 0, width: width, height: height }}
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
        }}
      >
        {options.map((option, index) => {
          const beforeVisibility =
            index === options.length - 1 && "before:hidden";
          return (
            <MenuItem
              key={option}
              onClick={handleClose}
              className={`before:absolute pb-[12px] before:w-[80%] before:left-[10%] before:bottom-0 before:bg-gray-100 before:h-[1px] ${beforeVisibility}`}
            >
              {option}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
