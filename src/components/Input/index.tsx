import clsx from "clsx";
import { ChangeEvent } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  type: string;
  placeholder?: string;
  disabled?: boolean;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({
  type,
  placeholder,
  disabled,
  value,
  onChange,
  className,
}: InputProps) {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      className={clsx(styles.input, className)}
      disabled={disabled}
      onChange={onChange}
    />
  );
}
