import React, { useState } from "react";
import Icon from "./Icon";
import SidebarLink from "./SidebarLink";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar() {
  const [minimized, setMinimized] = useState<boolean>(false);

  return (
    <>
      {/* ✅ Desktop Sidebar (XL+) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={minimized ? "sidebar-minimized" : "sidebar-full"}
          className={`will-change-[width] bg-grey-900 rounded-r-[16px] h-full flex-col justify-between p-[32px] pb-[64px] text-preset-3 text-gray-300 hidden xl:flex ${
            minimized ? "w-[88px] items-center" : "w-[300px] items-start"
          }`}
          layoutId="sidebar"
          layout
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 30,
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
            <div className="flex flex-col gap-[40px] w-full">
              <SidebarLink
                to="/overview"
                variant="overview"
                text={minimized ? "" : "Overview"}
                animate={!minimized}
              />
              <SidebarLink
                to="/transactions"
                variant="transactions"
                text={minimized ? "" : "Transactions"}
                animate={!minimized}
              />
              <SidebarLink
                to="/budgets"
                variant="budgets"
                text={minimized ? "" : "Budgets"}
                animate={!minimized}
              />
              <SidebarLink
                to="/pots"
                variant="pots"
                text={minimized ? "" : "Pots"}
                animate={!minimized}
              />
              <SidebarLink
                to="/bills"
                variant="bills"
                text={minimized ? "" : "Recurring bills"}
                animate={!minimized}
              />
            </div>
          </div>

          <button
            key={minimized ? "minimize-btn" : "maximize-btn"}
            className="mt-auto flex gap-[16px] items-start slight-fade-in"
            onClick={(e) => {
              e.preventDefault();
              setMinimized(!minimized);
            }}
          >
            <Icon
              variant="minimize-menu"
              className={
                minimized ? "rotate-[180deg] rotate-back" : "rotate180"
              }
            />
            {!minimized && (
              <p className="leading-none mt-[2px]"> Minimize Menu</p>
            )}
          </button>
        </motion.div>
      </AnimatePresence>

      {/* ✅ Mobile/Tablet Bottom Navigation (Below XL) */}
      <div className="z-[1000000] xl:hidden fixed bottom-0 left-0 w-full bg-grey-900 rounded-t-[16px] px-[32px] text-preset-5-bold text-gray-300">
        <div className="flex justify-between md:justify-around w-full h-full">
          <div className="flex-1 flex justify-center items-center">
            <SidebarLink
              to="/overview"
              variant="overview"
              text="Overview"
              animate={true}
              desktop={false}
            />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <SidebarLink
              to="/transactions"
              variant="transactions"
              text="Transactions"
              animate={true}
              desktop={false}
            />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <SidebarLink
              to="/budgets"
              variant="budgets"
              text="Budgets"
              animate={true}
              desktop={false}
            />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <SidebarLink
              to="/pots"
              variant="pots"
              text="Pots"
              animate={true}
              desktop={false}
            />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <SidebarLink
              to="/bills"
              variant="bills"
              text="Recurring bills"
              animate={true}
              desktop={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
