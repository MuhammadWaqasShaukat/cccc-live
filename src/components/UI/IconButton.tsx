import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton: React.FC<ButtonProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default IconButton;
