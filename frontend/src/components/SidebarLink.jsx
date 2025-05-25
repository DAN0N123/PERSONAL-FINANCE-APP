import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { motion } from "framer-motion";
export default function SidebarLink({ to, icon, text, animate = true }) {
  const location = useLocation();
  const { pathname } = location;
  const active = pathname === to;
  if (active) {
    return (
      <Link to={to}>
        <div className="relative isolate">
          {animate && (
            <motion.div
              className="absolute inset-0 top-[-50%] h-[48px] rounded-r-[16px] border-l-[6px] border-green bg-white pt-[16px] pb-[16px] ml-[-32px] pl-[32px] z-[0]"
              layoutId="nav-active-tab"
            ></motion.div>
          )}

          <div className="flex gap-[16px] text-black items-start">
            {icon && <Icon variant={icon} active={active} className="z-[10]" />}
            {text && <p className="z-[10] leading-none mt-[4px]"> {text} </p>}
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link to={to}>
      <div className="flex gap-[16px] hover:text-grey-100 items-start">
        {icon && <Icon variant={icon} />}
        {text && <p className="leading-none mt-[4px]"> {text} </p>}
      </div>
    </Link>
  );
}

SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string,
  text: PropTypes.string,
  animate: PropTypes.bool,
};
