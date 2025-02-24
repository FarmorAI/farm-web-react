import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled: boolean;
  message?: string;
  isValid?: boolean;
  isAvailable?: boolean | null;
  onButtonClick?: () => void;
  buttonText?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  message,
  isValid,
  isAvailable,
  onButtonClick,
  buttonText,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="flex gap-2">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="flex-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-custom focus:border-custom"
        placeholder={placeholder}
        disabled={disabled}
      />
      {buttonText && (
        <button
          type="button"
          onClick={onButtonClick}
          className="!rounded-button px-4 py-2 bg-custom text-white hover:bg-custom/90 disabled:opacity-50"
          disabled={disabled}
        >
          {buttonText}
        </button>
      )}
    </div>
    {message && (
      <p className={`text-sm mt-1 ${isValid ? "text-yellow-500" : "text-red-500"}`}>
        {message}
      </p>
    )}
    {isAvailable !== undefined && isAvailable !== null && (
      <p className={`text-sm mt-1 ${isAvailable ? "text-green-500" : "text-red-500"}`}>
        {isAvailable ? `사용 가능한 ${label}입니다.` : `이미 사용 중인 ${label}입니다.`}
      </p>
    )}
  </div>
);