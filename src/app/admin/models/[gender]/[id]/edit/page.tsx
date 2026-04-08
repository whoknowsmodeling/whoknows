import ModelForm from "@/components/forms/ModelForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditModelPage({ 
  params 
}: { 
  params: { gender: string, id: string } 
}) {
  const { gender, id } = await params;

  const model = await db.model.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!model) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href={`/admin/models/${gender}`}>
          <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-medium">Edit {model.name}</h1>
          <p className="text-neutral-500 text-sm">Update profile details and portfolio images.</p>
        </div>
      </div>

      <ModelForm initialData={model} gender={gender} />
    </div>
  );
}
