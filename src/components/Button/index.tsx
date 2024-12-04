import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./Button.module.scss";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  href?: string;
  onClick?: () => void;
  variant: "transparent";
  disabled?: boolean;
}

const Button = ({
  children,
  variant,
  disabled,
  href,
  onClick,
  type,
}: ButtonProps) => {
  const classNames = clsx(styles.button, styles[variant]);

  if (onClick || !href) {
    return (
      <button
        className={classNames}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href}>
        <button className={classNames} type={type} disabled={disabled}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames}
    >
      {children}
    </a>
  );
};
export default Button;
