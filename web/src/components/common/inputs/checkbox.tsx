import { useId } from "react";

interface Props {
  title: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
}

const Checkbox = ({
  title,
  disabled,
  required,
  value,
  onChange,
  ...field
}: Props) => {
  const id = useId();

  return (
    <div className="relative flex items-center gap-2">
      <div className="relative inline-flex items-center">
        <input
          id={id}
          type="checkbox"
          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 
            bg-white transition-all checked:border-primary-700 checked:bg-primary-700 
            hover:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/50 
            disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100
            dark:border-gray-600 dark:bg-gray-700 dark:checked:border-primary-500 
            dark:checked:bg-primary-500 dark:hover:border-primary-400 
            dark:focus:ring-primary-400/50 dark:disabled:border-gray-700 
            dark:disabled:bg-gray-800"
          {...field}
          checked={value}
          disabled={disabled}
          onChange={onChange}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
          text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            className="h-3.5 w-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
      <label
        htmlFor={id}
        className={`select-none text-sm font-medium text-gray-700 
          dark:text-gray-200 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} 
          ${required ? 'after:ml-0.5 after:text-red-500 after:content-["*"]' : ''}`}
      >
        {title}
      </label>
    </div>
  );
};

export default Checkbox;