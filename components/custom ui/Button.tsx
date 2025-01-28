import React from 'react';

interface ButtonProps {
  text: string; // Button text
  onClick: () => void; // Button click handler
  type?: 'primary' | 'secondary'; // Type for styling the button
  className?: string; // Optional custom styles
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = 'primary',
  className = '',
}) => {
  const baseStyles = 'py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none';
  const primaryStyles = 'bg-black text-white hover:bg-gray-800 active:bg-gray-900';
  const secondaryStyles = 'bg-transparent text-black border border-black hover:bg-gray-200 active:bg-gray-300';

  const buttonStyles = type === 'primary' ? primaryStyles : secondaryStyles;

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${buttonStyles} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
