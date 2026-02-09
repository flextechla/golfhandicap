import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  full?: boolean;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-golf-700 hover:bg-golf-800 text-white shadow-md hover:shadow-lg",
  outline:
    "border-2 border-golf-700 text-golf-700 hover:bg-golf-50 dark:hover:bg-golf-900/20",
  danger:
    "border-2 border-danger text-danger hover:bg-red-50 dark:hover:bg-red-900/20",
  ghost:
    "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800",
};

export default function Button({
  variant = "primary",
  full = true,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        rounded-xl font-bold text-sm px-5 py-3 transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${full ? "w-full" : "w-auto"}
        ${styles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}