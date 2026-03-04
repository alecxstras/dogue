"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/leaderboard", label: "Leaderboard", icon: "🏆" },
  { href: "/upload", label: "Upload", icon: "📷" },
  { href: "/profile", label: "Profile", icon: "👤" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex safe-bottom z-50">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center py-2 min-h-[56px] text-xs transition-colors ${
              active ? "text-orange-500" : "text-gray-500 hover:text-orange-400"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className={`mt-0.5 ${active ? "font-semibold" : ""}`}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
