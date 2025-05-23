import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
export default function Error() {
  const location = useLocation();
  const { pathname } = location;
  return <Sidebar></Sidebar>;
  return <p>The URL {pathname} doesn't exist</p>;
}
