import React, { useState } from "react";
import Icon from "./Icon";
import SidebarLink from "./SidebarLink";
import { motion } from "framer-motion";
function Sidebar() {
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <motion.div
        className="bg-grey-900 rounded-r-[16px] h-full flex flex-col items-center justify-between p-[32px] w-[90px]"
        layoutId="sidebar"
      >
        <Icon variant="logo-small" width="20px" height="auto" />

        <div className="flex flex-col gap-[48px] -mt-[20vh]">
          <Icon variant={"overview"} />
          <Icon variant={"transactions"} />
          <Icon variant={"budgets"} />
          <Icon variant={"pots"} />
          <Icon variant={"bills"} />
        </div>

        <Icon variant={"minimize-menu"} className="rotate-[180deg] " />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-grey-900 rounded-r-[16px] h-full flex flex-col items-start justify-between p-[32px] w-[300px] text-preset-3 text-gray-300"
      layoutId="sidebar"
    >
      <Icon variant="logo-large" width="100%" height="auto" />

      <div className="flex flex-col gap-[48px] -mt-[20vh] w-full">
        <SidebarLink
          to="/overview"
          icon="overview"
          text="Overview"
        ></SidebarLink>

        <SidebarLink
          to="/transactions"
          icon={"transactions"}
          text={"Transactions"}
        ></SidebarLink>

        <SidebarLink
          to="/budgets"
          icon={"budgets"}
          text={"Budgets"}
        ></SidebarLink>

        <SidebarLink to="/pots" icon={"pots"} text={"Pots"}></SidebarLink>

        <SidebarLink
          to="/bills"
          icon={"bills"}
          text={"Recurring bills"}
        ></SidebarLink>
      </div>

      <button
        className="flex gap-[16px]"
        onClick={() => {
          setMinimized(false);
        }}
      >
        <Icon variant="minimize-menu" />
        <p> Minimize Menu</p>
      </button>
    </motion.div>
  );
}

export default Sidebar;
