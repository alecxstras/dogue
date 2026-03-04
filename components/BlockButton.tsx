"use client";

import { useState } from "react";

export function BlockButton({ userId }: { userId: string }) {
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    if (blocked) {
      await fetch(`/api/block/${userId}`, { method: "DELETE" });
      setBlocked(false);
    } else {
      await fetch("/api/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      setBlocked(true);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      title={blocked ? "Unblock user" : "Block user"}
      className={`min-h-[36px] px-3 rounded-lg text-xs font-semibold border transition-colors disabled:opacity-50 ${
        blocked
          ? "border-gray-300 text-gray-500 hover:border-orange-400 hover:text-orange-500"
          : "border-gray-300 text-gray-500 hover:border-red-400 hover:text-red-500"
      }`}
    >
      {loading ? "..." : blocked ? "Unblock" : "Block"}
    </button>
  );
}
