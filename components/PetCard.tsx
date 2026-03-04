"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { GuessForm } from "./GuessForm";
import { ReportButton } from "./ReportButton";

type Pet = {
  id: string;
  ownerId: string;
  imageUrl: string;
  guessCount: number;
  correctGuessCount: number;
  owner: { name: string | null; username: string | null; image: string | null };
};

type GuessResult = {
  isCorrect: boolean;
  pointsEarned: number;
  correctName?: string;
};

export function PetCard() {
  const [pet, setPet] = useState<Pet | null | undefined>(undefined);
  const [result, setResult] = useState<GuessResult | null>(null);

  const fetchPet = useCallback(async () => {
    setPet(undefined);
    setResult(null);
    const res = await fetch("/api/pets");
    if (!res.ok) return setPet(null);
    const data = await res.json();
    setPet(data.pet ?? null);
  }, []);

  useEffect(() => {
    fetchPet();
  }, [fetchPet]);

  if (pet === undefined) {
    return (
      <div className="max-w-sm mx-auto">
        <div className="animate-pulse bg-gray-200 rounded-2xl aspect-square w-full mb-4" />
        <div className="animate-pulse h-10 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (pet === null) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-5xl mb-4">🐾</p>
        <p className="text-lg font-medium">You&apos;ve guessed all the pets!</p>
        <p className="text-sm mt-1">Check back later when new ones are added.</p>
      </div>
    );
  }

  const ownerDisplay = pet.owner.username ?? pet.owner.name ?? "Anonymous";

  return (
    <div className="max-w-sm mx-auto">
      <div className="rounded-2xl overflow-hidden shadow-md bg-white">
        <div className="relative aspect-square w-full">
          <Image
            src={pet.imageUrl}
            alt="A mystery pet"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
            priority
          />
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Posted by {ownerDisplay}</span>
            <div className="flex items-center gap-2">
              <span>{pet.guessCount} guesses · {pet.correctGuessCount} correct</span>
              <ReportButton petId={pet.id} reportedUserId={pet.ownerId} />
            </div>
          </div>

          {result ? (
            <div className="space-y-3">
              {result.isCorrect ? (
                <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-center">
                  <p className="text-green-700 font-bold text-lg">🎉 Correct!</p>
                  <p className="text-green-600 text-sm">+{result.pointsEarned} points earned</p>
                </div>
              ) : (
                <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-center">
                  <p className="text-red-700 font-semibold">Not quite!</p>
                  {result.correctName && (
                    <p className="text-red-600 text-sm mt-1">
                      The name was <strong>{result.correctName}</strong>
                    </p>
                  )}
                </div>
              )}
              <button
                onClick={fetchPet}
                className="w-full min-h-[44px] rounded-xl border-2 border-orange-400 text-orange-500 font-semibold hover:bg-orange-50 transition-colors"
              >
                Next Pet →
              </button>
            </div>
          ) : (
            <GuessForm petId={pet.id} onResult={setResult} />
          )}
        </div>
      </div>
    </div>
  );
}
