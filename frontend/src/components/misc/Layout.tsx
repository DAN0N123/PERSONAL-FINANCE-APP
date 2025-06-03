import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../reusable/sidebar/Sidebar";
import { UserContext } from "./UserContext";

export default function Layout() {
  const userContext = useContext(UserContext);

  if (!userContext || !userContext.user) {
    window.location.href = "/login";
    return null;
  }

  const { user } = userContext;

  if (user === null) {
    window.location.href = "/login";
  }

  return (
    <motion.div
      className="will-change-[width] flex flex-col gap-[32px] h-full p-[16px] xl:p-0 xl:flex-row w-full transform-width"
      layoutId="homepage"
    >
      <Sidebar />
      <Outlet />
    </motion.div>
  );
}
