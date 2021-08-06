import React, { ChangeEvent } from "react";

type InputProps = {
  min?: number;
  max?: number;
  value: number;
  width?: number;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  min,
  max,
  value,
  width = 45,
  className,
  onChange,
}) => {
  return (
    <input
      className={className}
      type="number"
      min={min}
      max={max}
      value={value}
      style={{ width }}
      onChange={onChange}
    />
  );
};

export default Input;
