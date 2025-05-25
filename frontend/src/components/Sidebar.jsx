import React, { useState } from "react";
import Icon from "./Icon";
import SidebarLink from "./SidebarLink";
import { motion, AnimatePresence } from "framer-motion";
function Sidebar() {
  const [minimized, setMinimized] = useState(true);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={minimized ? "sidebar-minimized" : "sidebar-full"}
        className={`will-change-[width] bg-grey-900 rounded-r-[16px] h-full flex flex-col items-start justify-between p-[32px] pb-[64px] w-[300px] text-preset-3 text-gray-300 ${
          minimized && "w-[88px]"
        }`}
        layoutId="sidebar"
        layout
        transition={{
          type: "spring",
          stiffness: 270,
          damping: 25,
          duration: "500ms",
        }}
      >
        <div className="flex flex-col h-fit fade-in">
          <Icon
            variant={minimized ? "logo-small" : "logo-large"}
            width={minimized ? "20px" : "100%"}
            height="100px"
            className="mb-[50px]"
          />
          <div className="flex flex-col gap-[48px] w-full">
            <SidebarLink
              to="/overview"
              icon="overview"
              text={minimized ? "" : "Overview"}
              animate={!minimized}
            ></SidebarLink>
            <SidebarLink
              to="/transactions"
              icon={"transactions"}
              text={minimized ? "" : "Transactions"}
              animate={!minimized}
            ></SidebarLink>
            <SidebarLink
              to="/budgets"
              icon={"budgets"}
              text={minimized ? "" : "Budgets"}
              animate={!minimized}
            ></SidebarLink>
            <SidebarLink
              to="/pots"
              icon={"pots"}
              text={minimized ? "" : "Pots"}
              animate={!minimized}
            ></SidebarLink>
            <SidebarLink
              to="/bills"
              icon={"bills"}
              text={minimized ? "" : "Recurring bills"}
              animate={!minimized}
            ></SidebarLink>
          </div>
        </div>

        <button
          key={minimized ? "minimize-btn" : "maximize-btn"}
          className="flex gap-[16px] items-start slight-fade-in"
          onClick={() => {
            setMinimized(!minimized);
          }}
        >
          <Icon
            variant="minimize-menu"
            className={minimized ? "rotate-[180deg] rotate-back" : "rotate180"}
          />
          {minimized ? null : (
            <p className="leading-none mt-[2px]"> Minimize Menu</p>
          )}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default Sidebar;
