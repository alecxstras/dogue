"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteAccountButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (confirm !== "DELETE") return;
    setDeleting(true);
    setError("");
    try {
      const res = await fetch("/api/user", { method: "DELETE" });
      if (!res.ok) {
        setError("Failed to delete account. Please try again.");
        setDeleting(false);
        return;
      }
      router.push("/login");
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-red-700">Danger Zone</h3>
          <p className="text-xs text-red-600 mt-0.5">
            Permanently delete your account, all your pets, and all your guesses. This cannot be undone.
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="min-h-[44px] px-4 rounded-xl border border-red-400 text-red-600 font-semibold hover:bg-red-100 transition-colors text-sm"
        >
          Delete my account
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900">Delete account?</h2>
            <p className="text-sm text-gray-600">
              This will permanently delete all your data. Type{" "}
              <strong>DELETE</strong> to confirm.
            </p>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Type DELETE"
              className="w-full min-h-[44px] px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-base"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={() => { setOpen(false); setConfirm(""); setError(""); }}
                className="flex-1 min-h-[44px] rounded-xl border text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={confirm !== "DELETE" || deleting}
                className="flex-1 min-h-[44px] rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
