import { getModelsList } from "@/lib/edge-data";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const runtime = 'edge';
export const dynamic = "force-dynamic";

export default async function AdminModelsPage({ params }: { params: Promise<{ gender: string }> }) {
  const gender = (await params).gender;
  
  const models = await getModelsList(gender);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-medium capitalize">Models: {gender}</h1>
          <p className="text-neutral-500 text-sm">Manage entries, headshots, and portfolios for {gender} talent.</p>
        </div>
        <Link href={`/admin/models/${gender}/new`}>
          <Button className="bg-white text-black hover:bg-neutral-200 uppercase tracking-widest text-xs px-6 py-4">
            <Plus className="w-4 h-4 mr-2" /> Add {gender.slice(0, -1)} Model
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {models.map((model) => (
          <Card key={model.id} className="bg-neutral-900 border-neutral-800 overflow-hidden group">
            <div className="relative aspect-[3/4] bg-neutral-800">
              {model.images[0]?.imageUrl && (
                <Image
                  src={model.images[0].imageUrl}
                  alt={model.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                {model.featured && <Badge className="bg-white text-black text-[10px] uppercase font-bold tracking-tighter">Featured</Badge>}
              </div>
            </div>
            <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-lg font-serif">{model.name}</CardTitle>
                <CardDescription className="text-xs uppercase tracking-tight text-neutral-500">{model.location || "International"}</CardDescription>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/admin/models/${gender}/${model.id}/edit`}>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-neutral-400 hover:text-white">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </Link>
                <a href={`/model/${model.slug}`} target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-neutral-400 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <form action={async (formData) => {
                  'use server';
                  const { deleteModel } = await import("@/app/admin/models/actions");
                  if (confirm("Are you sure you want to delete this model? This action is permanent.")) {
                    await deleteModel(model.id, gender);
                  }
                }}>
                  <Button type="submit" size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </CardHeader>
          </Card>
        ))}

        {models.length === 0 && (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-neutral-800 rounded-2xl">
            <p className="text-neutral-500 font-serif text-lg">No {gender} models found in database.</p>
            <Button variant="link" className="text-white mt-4 uppercase tracking-widest text-xs">
              Add your first {gender} model
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
