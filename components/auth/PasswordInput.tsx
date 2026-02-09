"use client";

import { useState, InputHTMLAttributes } from "react";

interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export default function PasswordInput({
  label,
  className = "",
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label className="block text-xs font-bold text-zinc-500 mb-1">
          {label}
        </label>
      )}
      <input
        type={visible ? "text" : "password"}
        className={`w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-base focus:ring-2 focus:ring-golf-500 focus:border-transparent outline-none pr-16 ${className}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-golf-700 hover:text-golf-900 py-1 px-2"
        style={label ? { top: "calc(50% + 10px)" } : undefined}
      >
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
}
