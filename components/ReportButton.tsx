"use client";

import { useState } from "react";

const REASONS = [
  "Inappropriate content",
  "Offensive image",
  "Spam",
  "Harassment",
  "Other",
];

type Props = {
  petId: string;
  reportedUserId?: string;
};

export function ReportButton({ petId, reportedUserId }: Props) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    if (!reason) return;
    setSubmitting(true);
    await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ petId, reportedUserId, reason }),
    });
    setSubmitting(false);
    setDone(true);
    setTimeout(() => { setOpen(false); setDone(false); setReason(""); }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Report this pet"
        className="text-gray-400 hover:text-red-500 transition-colors p-1"
        aria-label="Report"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 space-y-4 shadow-xl">
            {done ? (
              <div className="text-center py-4">
                <p className="text-green-600 font-semibold">Thanks for the report!</p>
                <p className="text-sm text-gray-500 mt-1">We&apos;ll review it shortly.</p>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold text-gray-900">Report content</h2>
                <p className="text-sm text-gray-600">Why are you reporting this?</p>
                <div className="space-y-2">
                  {REASONS.map((r) => (
                    <label key={r} className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="reason"
                        value={r}
                        checked={reason === r}
                        onChange={() => setReason(r)}
                        className="accent-orange-500"
                      />
                      <span className="text-sm text-gray-700">{r}</span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setOpen(false); setReason(""); }}
                    className="flex-1 min-h-[44px] rounded-xl border text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!reason || submitting}
                    className="flex-1 min-h-[44px] rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors"
                  >
                    {submitting ? "Sending..." : "Report"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
