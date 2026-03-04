import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white py-4 px-4 pb-safe">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-gray-400">
        <span>© {new Date().getFullYear()} Dogue</span>
        <span className="hidden sm:inline">·</span>
        <Link href="/privacy" className="hover:text-orange-500 transition-colors underline underline-offset-2">
          Privacy Policy
        </Link>
        <span>·</span>
        <Link href="/terms" className="hover:text-orange-500 transition-colors underline underline-offset-2">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
