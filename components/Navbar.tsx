import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-orange-500 tracking-tight">
          Dogue 🐾
        </Link>
        {/* Desktop nav — hidden on mobile (bottom nav used instead) */}
        <div className="hidden sm:flex items-center gap-4">
          <Link href="/leaderboard" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">
            Leaderboard
          </Link>
          {session ? (
            <>
              <Link href="/upload" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">
                Upload
              </Link>
              <Link href="/profile" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">
                Profile
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="text-sm px-3 py-1.5 rounded-lg border text-gray-600 hover:border-orange-400 hover:text-orange-500 transition-colors"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm px-4 py-1.5 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
