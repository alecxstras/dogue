import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UploadForm } from "@/components/UploadForm";

export default async function UploadPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="container mx-auto px-4 py-8 pb-24 max-w-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Your Pet</h1>
      <p className="text-sm text-gray-500 mb-8">
        Upload a photo and set a secret name — other players will try to guess it.
      </p>
      <UploadForm />
    </main>
  );
}
