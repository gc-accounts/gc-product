import React from "react";

interface FormInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  type?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  value,
  onChange,
  error,
  disabled = false,
  type = "text",
  required = false,
  placeholder = "",
  multiline = false,
  rows = 3,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary-green focus:outline-none placeholder:text-gray-500"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary-green focus:outline-none placeholder:text-gray-500"
        />
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
