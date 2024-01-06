import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.scss";

export type DropdownOption = {
  label: string;
  icon?: string;
};
type DropdownProps = {
  options: DropdownOption[];
  setOptions: (options: DropdownOption[]) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, setOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<DropdownOption[]>([]);
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleDropdown = () => {
    if (!isOpen) {
      inputRef?.current?.focus();
    } else {
      inputRef?.current?.blur();
    }
    setIsOpen(!isOpen);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      let optionIndex = options.findIndex(
        (item) => item.label.toLowerCase() === inputValue.trim().toLowerCase()
      );
      let isSelected =
        selectedItems.findIndex(
          (item) => item.label.toLowerCase() === inputValue.trim().toLowerCase()
        ) === -1;
      if (isSelected && optionIndex !== -1) {
        setSelectedItems([...selectedItems, options[optionIndex]]);
      } else {
        setOptions([...options, {label: inputValue.trim()}])
      }
      setInputValue("");
    }
  };

  const handleItemClick = (item: DropdownOption) => {
    if (
      selectedItems.findIndex((option) => option.label === item.label) === -1
    ) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems([
        ...selectedItems.filter((option) => option.label !== item.label),
      ]);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="dropdown">
      <button
        className={`dropdown-select${isOpen ? " active" : ""}`}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        role="button"
      >
        <p>{inputValue}</p>
      </button>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className="dropdown-input"
        role="textbox"
        aria-label="Add new item"
      />
      {isOpen && (
        <div className="dropdown-menu">
          <ul className="dropdown-item-list" role="listbox">
            {options.map(
              (option, index) =>
                option.label.toLowerCase().includes(inputValue.trim().toLowerCase()) && (
                  <li
                    className={`${
                      selectedItems.includes(option) ? "selected" : ""
                    }`}
                    key={`option__${index}`}
                    onClick={() => handleItemClick(option)}
                    role="option"
                  >
                    {`${option.label}${option.icon ? " " + option.icon : ""}`}
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
