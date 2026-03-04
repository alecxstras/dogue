import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PetCard } from "@/components/PetCard";

export default async function HomePage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="container mx-auto px-4 py-8 pb-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Guess the Pet!</h1>
        <p className="text-gray-500 mt-1 text-sm">Type the pet&apos;s name to earn 10 points</p>
      </div>
      <PetCard />
    </main>
  );
}
