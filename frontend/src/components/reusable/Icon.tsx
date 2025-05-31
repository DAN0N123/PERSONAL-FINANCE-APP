import PropTypes from "prop-types";
import { SVGProps } from "react";
import React from "react";

// Icon imports
import { ReactComponent as LogoSmall } from "../../../mentor-starter-code/assets/images/logo-small.svg";
import { ReactComponent as LogoLarge } from "../../../mentor-starter-code/assets/images/logo-large.svg";
import { ReactComponent as IconOverview } from "../../../mentor-starter-code/assets/images/icon-nav-overview.svg";
import { ReactComponent as IconTransactions } from "../../../mentor-starter-code/assets/images/icon-nav-transactions.svg";
import { ReactComponent as IconBudgets } from "../../../mentor-starter-code/assets/images/icon-nav-budgets.svg";
import { ReactComponent as IconPots } from "../../../mentor-starter-code/assets/images/icon-nav-pots.svg";
import { ReactComponent as IconBills } from "../../../mentor-starter-code/assets/images/icon-nav-recurring-bills.svg";
import { ReactComponent as IconMinimize } from "../../../mentor-starter-code/assets/images/icon-minimize-menu.svg";
import { ReactComponent as IllustrationAuthentication } from "../../../mentor-starter-code/assets/images/illustration-authentication.svg";

const icons = {
  "logo-small": LogoSmall,
  "logo-large": LogoLarge,
  overview: IconOverview,
  transactions: IconTransactions,
  budgets: IconBudgets,
  pots: IconPots,
  bills: IconBills,
  "minimize-menu": IconMinimize,
  authentication: IllustrationAuthentication,
};

export type IconVariants =
  | "logo-small"
  | "logo-large"
  | "overview"
  | "transactions"
  | "budgets"
  | "pots"
  | "bills"
  | "minimize-menu"
  | "authentication";

interface IconProps extends SVGProps<SVGSVGElement> {
  variant: IconVariants;
  active?: boolean;
}

export default function Icon({
  variant,
  width = "24px",
  height = "24px",
  color = "white",
  className = "",
  active = false,
  ...delegated
}: IconProps) {
  const SvgIcon = icons[variant];
  if (!SvgIcon) {
    console.warn(`Icon with variant "${variant}" not found.`);
    return null;
  }
  const currentColor = active ? "hsl(177, 55%, 32%)" : color;
  return (
    <SvgIcon
      width={width}
      height={height}
      style={{ fill: currentColor }}
      className={`${className}`}
      {...delegated}
    />
  );
}

Icon.propTypes = {
  variant: PropTypes.string.isRequired,
  width: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.string,
  active: PropTypes.bool,
  color: PropTypes.string,
};
