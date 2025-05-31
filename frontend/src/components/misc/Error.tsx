import { useLocation } from "react-router-dom";
import Sidebar from "../reusable/sidebar/Sidebar";
import React from "react";
export default function Error() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <Sidebar></Sidebar>
      <p>The URL {pathname} doesn't exist</p>
    </>
  );
}
