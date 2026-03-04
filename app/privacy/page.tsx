import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Dogue",
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-10 pb-24 max-w-2xl">
      <Link href="/" className="text-sm text-orange-500 hover:underline mb-6 block">
        ← Back to Dogue
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: March 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">1. What we collect</h2>
          <p>When you use Dogue, we collect the following information:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Account info:</strong> Your name and email address (provided by Google when you sign in via Google OAuth).</li>
            <li><strong>Profile picture:</strong> Your Google profile photo, if you have one.</li>
            <li><strong>Username:</strong> An optional display name you choose inside the app.</li>
            <li><strong>Pet photos:</strong> Images you upload are stored via Cloudinary, a third-party image hosting service.</li>
            <li><strong>Game data:</strong> The secret names you assign to your pets, your guesses, and your points.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">2. How we use your data</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To power the guessing game (show you pets, record guesses, award points).</li>
            <li>To display your username and score on the leaderboard.</li>
            <li>To associate uploaded pet photos with your account.</li>
            <li>We do <strong>not</strong> sell your data to third parties.</li>
            <li>We do <strong>not</strong> use your data for advertising.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Third-party services</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Google OAuth:</strong> Used for sign-in. Google&apos;s privacy policy applies to the sign-in flow.</li>
            <li><strong>Cloudinary:</strong> Pet photos are uploaded to and served from Cloudinary. Cloudinary&apos;s privacy policy governs stored images.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Data retention</h2>
          <p>
            Your data is retained as long as your account exists. When you delete your account,
            all associated data — including your profile, pets, guesses, and points — is permanently
            deleted from our database. Note that Cloudinary-hosted images may take additional time
            to be removed from their CDN caches.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Your rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Access the data we hold about you.</li>
            <li>Delete your account and all associated data at any time — directly from the{" "}
              <Link href="/profile" className="text-orange-500 underline">Profile page</Link>.</li>
            <li>Update your display name at any time from the Profile page.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Children</h2>
          <p>
            Dogue is not directed at children under 13. We do not knowingly collect personal
            information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Contact</h2>
          <p>
            If you have questions about this policy or your data, please contact us at{" "}
            <strong>privacy@dogue.app</strong>.
          </p>
        </section>
      </div>
    </main>
  );
}
