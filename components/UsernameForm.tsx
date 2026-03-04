"use client";

import { useState } from "react";

export function UsernameForm({ currentUsername }: { currentUsername: string | null }) {
  const [value, setValue] = useState(currentUsername ?? "");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: value }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrorMsg(data.error ?? "Failed to save");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Something went wrong");
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-4 space-y-3">
      <div>
        <h3 className="font-semibold text-gray-900">Display name</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          This is shown instead of your real name on leaderboards and pet cards.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={value}
          onChange={(e) => { setValue(e.target.value); setStatus("idle"); }}
          placeholder="e.g. PuppyWatcher42"
          maxLength={30}
          className="flex-1 min-h-[44px] px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-base"
        />
        <button
          type="submit"
          disabled={saving || !value.trim()}
          className="min-h-[44px] px-4 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-50 transition-colors"
        >
          {saving ? "..." : "Save"}
        </button>
      </form>
      {status === "success" && (
        <p className="text-sm text-green-600">Username saved!</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}
    </div>
  );
}
