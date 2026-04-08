import ModelForm from "@/components/forms/ModelForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function NewModelPage({ params }: { params: { gender: string } }) {
  const gender = (await params).gender;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href={`/admin/models/${gender}`}>
          <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-medium">Add New {gender.slice(0, -1)}</h1>
          <p className="text-neutral-500 text-sm">Fill in the details to add a new talent to the roster.</p>
        </div>
      </div>

      <ModelForm gender={gender} />
    </div>
  );
}
