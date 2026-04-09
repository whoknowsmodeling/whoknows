import { getHeroSlides } from "@/lib/admin-data";

export const runtime = 'edge';
export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  const slides = await getHeroSlides();

  return <HeroManagement slides={slides} />;
}
