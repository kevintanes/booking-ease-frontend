import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-surface-100 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
