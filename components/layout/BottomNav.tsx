"use client";

import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { href: "/history", label: "History", icon: "📋" },
  { href: "/add", label: "Add", icon: "➕" },
  { href: "/rankings", label: "Rankings", icon: "🏆" },
  { href: "/groups", label: "Groups", icon: "👥" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
      <div className="max-w-lg mx-auto flex">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <button
              key={tab.href}
              onClick={() => router.push(tab.href)}
              className={`flex-1 flex flex-col items-center py-2.5 transition-colors ${
                active
                  ? "text-golf-700"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              <span
                className={`text-[10px] mt-0.5 font-bold ${
                  active ? "text-golf-700" : ""
                }`}
              >
                {tab.label}
              </span>
              {active && (
                <div className="w-1 h-1 rounded-full bg-golf-700 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
