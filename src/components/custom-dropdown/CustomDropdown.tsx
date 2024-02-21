import React, { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";


// SCSS.
import "./CustomDropdown.scss";
import { DropdownOptionsType } from "../../utils/types";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const css_prefix = "cd__";

// Component props.
interface CustomDropdownProps {
  title: string;
  value: number;
  handleChange: (value: number) => void;
  options: DropdownOptionsType[];
}

const CustomDropdownComponent: React.FunctionComponent<CustomDropdownProps> = ({
  value,
  title,
  handleChange,
  options,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const hideDropdown = () => {
    setChecked(false);
  }

  useOnClickOutside(dropdownRef, hideDropdown);

  return (
    <div className={`${css_prefix}main`}>
      <div className={`${css_prefix}header`} onClick={() => setChecked(!checked)}>
        <div className={`${css_prefix}header-text`}>
          {title}
        </div>

        <div className={`${css_prefix}header-icon`}>
          <FaChevronDown fontSize={12} />
        </div>
      </div>

      {checked ? (
        <div className={`${css_prefix}options`} ref={dropdownRef}>
          {options.map((e) => {
            return (
              <div key={e.value} className={`${css_prefix}option-item ${value === e.value ? css_prefix + 'option-item-selected' : ''}`} onClick={() => {
                handleChange(e.value)
                setChecked(false);
              }}>
                {e.label}
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  );
};

export const CustomDropdown = CustomDropdownComponent;