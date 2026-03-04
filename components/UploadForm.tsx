"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function UploadForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [petName, setPetName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !petName.trim()) return;
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("name", petName.trim());
      const res = await fetch("/api/pets", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Upload failed");
        return;
      }
      router.push("/profile");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pet photo
        </label>
        {preview && (
          <div className="mb-3 relative aspect-square w-full max-w-xs rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors">
          <span className="text-gray-500 text-sm">
            {file ? file.name : "Tap to choose a photo or take one"}
          </span>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFile}
            className="sr-only"
            required
          />
        </label>
      </div>

      <div>
        <label htmlFor="petName" className="block text-sm font-medium text-gray-700 mb-2">
          Secret pet name
        </label>
        <input
          id="petName"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          placeholder="e.g. Biscuit"
          className="w-full min-h-[44px] px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-base"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Other players will try to guess this. Keep it secret!
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={!file || !petName.trim() || uploading}
        className="w-full min-h-[44px] rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {uploading ? "Uploading..." : "Add to Dogue 🐾"}
      </button>
    </form>
  );
}
