import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const POINTS_PER_CORRECT_GUESS = 10;

export function namesMatch(guessed: string, actual: string): boolean {
  return guessed.trim().toLowerCase() === actual.trim().toLowerCase();
}
