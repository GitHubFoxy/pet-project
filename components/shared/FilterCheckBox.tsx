import React, { ButtonHTMLAttributes } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export interface FilterCheckBoxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckChange?: (checked: boolean) => void;
  checked?: boolean;
  name?:string
}

const FilterCheckBox: React.FC<FilterCheckBoxProps> = ({
  text,
  value,
  endAdornment,
  onCheckChange,
  checked,
  name
}) => {
  return (
    <div className="flex select-none items-center space-x-2">
      <Checkbox
        onCheckedChange={onCheckChange}
        checked={checked}
        value={value}
        className="h-6 w-6 rounded-[8px] border-none bg-gray-200 transition-colors data-[state=checked]:bg-orange-400"
        id={`checkbox-${String(name)}-${String(value)}`}
      />
      <label
        htmlFor={`checkbox-${String(name)}-${String(value)}`}
        className="flex-1 cursor-pointer leading-none"
      >
        {text}
      </label>
      {endAdornment}
    </div>
  );
};

export default FilterCheckBox;
