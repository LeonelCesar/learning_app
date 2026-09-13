"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import type { SearchableSelectProps } from "../../Components/SearchableSelect/searchable-select.type";

export function SearchableSelect<T>({
  label,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
  disabled = false,
  errorMessage,
  emptyMessage = "No options found",
}: SearchableSelectProps<T>) {

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxId = "searchable-select-listbox";

  
  const selectedOption = useMemo(() => {
    return options.find((option) => getOptionValue(option) === value);
  }, [options, value, getOptionValue]);

  const filteredOptions = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return options;
    }

    return options.filter((option) =>
      getOptionLabel(option).toLowerCase().includes(normalizedSearch),
    );
  }, [options, search, getOptionLabel]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setHighlightedIndex(-1);

      return;
    }

    searchInputRef.current?.focus();
  }, [isOpen]);

  function handleToggle() {
    if (disabled) {
      return;
    }

    setIsOpen((previous) => !previous);
  }

  function handleSelect(option: T) {
    const optionValue = getOptionValue(option);

    onChange(optionValue, option);

    setIsOpen(false);
    setSearch("");
    setHighlightedIndex(-1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (disabled) {
      return;
    }

    if (event.key === "Enter" && !isOpen) {
      event.preventDefault();
      setIsOpen(true);
      return;
    }

    if (event.key === " " && !isOpen) {
      event.preventDefault();
      setIsOpen(true);
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
      return;
    }

    if (!isOpen || filteredOptions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setHighlightedIndex((previousIndex) => {
        const nextIndex = previousIndex + 1;

        if (nextIndex >= filteredOptions.length) {
          return 0;
        }

        return nextIndex;
      });

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setHighlightedIndex((previousIndex) => {
        if (previousIndex <= 0) {
          return filteredOptions.length - 1;
        }

        return previousIndex - 1;
      });

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const highlightedOption = filteredOptions[highlightedIndex];

      if (highlightedOption) {
        handleSelect(highlightedOption);
      }
    }
  }

  return (
    <div ref={containerRef} className="w-full" onKeyDown={handleKeyDown}>
      {label && (
        <label
          className="
            mb-2 block
            text-sm font-medium
            text-slate-700
          "
        >
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          className={[
            "flex w-full",
            "items-center",
            "justify-between",
            "rounded-lg",
            "border",
            "bg-white",
            "px-4 py-3",
            "text-left",
            "transition",

            errorMessage ? "border-red-500" : "border-slate-300",

            disabled
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : "hover:border-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200",
          ].join(" ")}
        >
          <span
            className={selectedOption ? "text-slate-900" : "text-slate-400"}
          >
            {selectedOption ? getOptionLabel(selectedOption) : placeholder}
          </span>

          <span
            aria-hidden="true"
            className={[
              "ml-3",
              "transition-transform",
              isOpen ? "rotate-180" : "",
            ].join(" ")}
          >
            ▼
          </span>
        </button>

        {isOpen && (
          <div
            className="
              absolute
              z-50
              mt-2
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              p-2
              shadow-xl
            "
          >
            <div className="p-2">
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);

                  setHighlightedIndex(-1);
                }}
                placeholder={searchPlaceholder}
                aria-label="Search options"
                className="
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  px-3 py-2
                  text-sm
                  outline-none
                  transition
                  focus:border-slate-500
                  focus:ring-2
                  focus:ring-slate-200
                "
              />
            </div>

            <ul
              id={listboxId}
              role="listbox"
              className="
                max-h-60
                overflow-y-auto
                py-1
              "
            >
              {filteredOptions.length === 0 ? (
                <li
                  className="
                    px-3 py-4
                    text-center
                    text-sm
                    text-slate-500
                  "
                >
                  {emptyMessage}
                </li>
              ) : (
                filteredOptions.map((option, index) => {
                  const optionValue = getOptionValue(option);
                  const optionLabel = getOptionLabel(option);
                  const isSelected = optionValue === value;
                  const isHighlighted = index === highlightedIndex;

                  return (
                    <li
                      key={optionValue}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelect(option)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        className={[
                          "flex w-full",
                          "items-center",
                          "justify-between",
                          "rounded-lg",
                          "px-3 py-2.5",
                          "text-left",
                          "text-sm",
                          "transition",

                          isHighlighted ? "bg-slate-100" : "hover:bg-slate-50",

                          isSelected
                            ? "font-semibold text-slate-900"
                            : "text-slate-700",
                        ].join(" ")}
                      >
                        <span>{optionLabel}</span>

                        {isSelected && <span aria-hidden="true">✓</span>}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="
            mt-2
            text-sm
            text-red-600
          "
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
