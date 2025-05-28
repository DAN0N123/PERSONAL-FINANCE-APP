import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { motion, AnimatePresence } from "framer-motion";
import { IconVariants } from "./Icon";

interface SidebarLinkProps {
  to: string;
  variant: IconVariants;
  text: string;
  animate?: boolean;
  desktop?: boolean;
}

export default function SidebarLink({
  to,
  variant,
  text,
  animate = true,
  desktop = true,
}: SidebarLinkProps) {
  const location = useLocation();
  const { pathname } = location;
  const active = pathname === to;

  if (active) {
    return (
      <Link to={to} className="w-full h-full">
        <div className="relative isolate h-full w-full">
          {animate && (
            <motion.div
              className="absolute z-[0] inset-0 top-[10%] border-green bg-white rounded-t-[10px] xl:rounded-tl-[0px] border-b-[6px] w-full h-[90%] xl:inset-0 xl:border-b-[0] xl:top-[-50%] xl:h-[48px] xl:rounded-r-[16px] xl:rounded-tr-[16px] xl:border-l-[6px]  xl:pt-[16px] xl:pb-[16px] xl:ml-[-32px] xl:pl-[32px]"
              layoutId={`nav-active${desktop && "-xl"}`}
            ></motion.div>
          )}

          <div className="flex flex-row justify-center gap-[8px] pt-[20px] pb-[20px] md:flex-col md:items-center xl:flex-row xl:p-0 xl:justify-start xl:items-start xl:gap-[16px] text-black ">
            {variant && (
              <Icon variant={variant} active={active} className="z-[10]" />
            )}
            {text && (
              <p className="z-[10] leading-none mt-[4px] hidden md:block">
                {" "}
                {text}{" "}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link to={to}>
      <div className="flex flex-col gap-[8px] items-center xl:flex-row xl:gap-[16px] hover:text-grey-100 xl:items-start pt-[20px] pb-[20px] xl:p-0">
        {variant && <Icon variant={variant} />}
        {text && (
          <p className="leading-none mt-[4px] hidden md:block"> {text} </p>
        )}
      </div>
    </Link>
  );
}

SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string,
  text: PropTypes.string,
  animate: PropTypes.bool,
  desktop: PropTypes.bool,
};
