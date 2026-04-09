import { getHeroSlides } from "@/lib/edge-data";
import HeroManagement from "@/components/admin/HeroManagement";

export const runtime = 'edge';
export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  const slides = await getHeroSlides();

  return <HeroManagement slides={slides} />;
}
