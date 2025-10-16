import React from "react";
// Replaced MUI TextField with shadcn/ui components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { Label } from "@/components/ui/label";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  disabled,
  required,
  multiline = false,
  rows = 4,
}) => {
  // Select the appropriate component based on the multiline prop
  const InputComponent = multiline ? Textarea : Input;

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor={name} className={error ? "text-red-500" : ""}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <InputComponent
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        // Tailwind/shadcn input validation appearance
        className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
        {...(multiline && { rows })} // Only apply rows if multiline
      />
      {/* Helper Text/Error Message */}
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormInput;