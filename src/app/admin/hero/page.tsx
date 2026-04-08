import HeroManagement from "@/components/admin/HeroManagement";
import { db } from "@/lib/db";

export default async function AdminHeroPage() {
  const slides = await db.heroSlide.findMany({
    orderBy: { order: "asc" },
  });

  return <HeroManagement slides={slides} />;
}
