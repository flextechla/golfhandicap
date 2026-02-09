import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 rounded-2xl p-5 mb-4 border border-zinc-200 dark:border-zinc-800 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}