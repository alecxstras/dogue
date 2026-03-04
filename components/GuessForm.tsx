"use client";

import { useState } from "react";

type GuessResult = {
  isCorrect: boolean;
  pointsEarned: number;
  correctName?: string;
};

type Props = {
  petId: string;
  onResult: (res: GuessResult) => void;
};

export function GuessForm({ petId, onResult }: Props) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId, guessedName: value }),
      });
      const data = await res.json();
      onResult(data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What's this pet's name?"
        disabled={submitting}
        className="flex-1 min-h-[44px] px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-base"
      />
      <button
        type="submit"
        disabled={submitting || !value.trim()}
        className="min-h-[44px] px-5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? "..." : "Guess!"}
      </button>
    </form>
  );
}
