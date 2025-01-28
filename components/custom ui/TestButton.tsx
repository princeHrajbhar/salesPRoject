import { FC } from "react";

type CustomButtonProps = {
  type?: "button" | "submit" | "reset";
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

const CustomButton: FC<CustomButtonProps> = ({
  type = "button",
  label,
  onClick,
  isLoading = false,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`w-full py-2 rounded-lg text-white transition ${
        isLoading || disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-black hover:bg-gray-800"
      } ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <span className="loader w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
          <span>Loading...</span>
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default CustomButton;
