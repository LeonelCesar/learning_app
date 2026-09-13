export interface SearchableSelectProps<T> {
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
options: T[];
  value?: string;

  onChange: (
    value: string,
    option: T,
  ) => void;

  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;

  disabled?: boolean;
  errorMessage?: string;
  emptyMessage?: string;
}