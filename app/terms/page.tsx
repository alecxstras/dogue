import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Dogue",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-10 pb-24 max-w-2xl">
      <Link href="/" className="text-sm text-orange-500 hover:underline mb-6 block">
        ← Back to Dogue
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Acceptance</h2>
          <p>
            By creating an account or using Dogue, you agree to these Terms of Service.
            If you do not agree, do not use the app.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Your account</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>You must be 13 or older to use Dogue.</li>
            <li>You are responsible for maintaining the security of your account.</li>
            <li>One account per person.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Content rules</h2>
          <p>When uploading pet photos, you agree that the content:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Is a genuine photo of an animal you have permission to share.</li>
            <li>Does not contain nudity, violence, graphic content, or illegal material.</li>
            <li>Does not depict animal abuse or mistreatment.</li>
            <li>Does not infringe any third-party copyright or trademark.</li>
            <li>Is not spam or promotional material.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Content ownership</h2>
          <p>
            You retain ownership of the photos you upload. By uploading, you grant Dogue a
            non-exclusive, worldwide, royalty-free license to display your photo within the
            app for the purpose of the guessing game. This license ends when you delete the
            pet or your account.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Prohibited behaviour</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Harassment, abuse, or threats toward other users.</li>
            <li>Attempting to cheat the scoring system.</li>
            <li>Uploading malicious content or attempting to exploit the app.</li>
            <li>Creating fake accounts or impersonating others.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Enforcement</h2>
          <p>
            We reserve the right to remove any content or suspend any account that violates
            these terms, at our sole discretion, without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Disclaimer</h2>
          <p>
            Dogue is provided &quot;as is&quot; without warranties of any kind. We are not liable
            for any damages arising from your use of the app.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Account deletion</h2>
          <p>
            You can delete your account at any time from the{" "}
            <Link href="/profile" className="text-orange-500 underline">Profile page</Link>.
            Deletion is permanent and removes all your data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Changes</h2>
          <p>
            We may update these terms from time to time. Continued use of Dogue after changes
            are posted constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">10. Contact</h2>
          <p>
            Questions about these terms? Email us at <strong>legal@dogue.app</strong>.
          </p>
        </section>
      </div>
    </main>
  );
}
