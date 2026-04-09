"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Edit2, MoveVertical, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { upsertHeroSlide, deleteHeroSlide } from "@/app/admin/hero/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function HeroManagement({ slides }: { slides: any[] }) {
  const [isEditing, setIsEditing] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-medium">Hero Slides</h1>
          <p className="text-neutral-500 text-sm">Manage the large cinematic slides on the homepage.</p>
        </div>
        
        <Dialog open={open} onOpenChange={(val) => {
          setOpen(val);
          if (!val) {
            setIsEditing(null);
            setPreview(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-neutral-200 uppercase tracking-widest text-xs px-6 py-4">
              <Plus className="w-4 h-4 mr-2" /> Add Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">{isEditing ? "Edit Slide" : "New Hero Slide"}</DialogTitle>
            </DialogHeader>
            <form action={async (formData) => {
              await upsertHeroSlide(formData);
              setOpen(false);
            }} className="space-y-6 pt-4">
              <input type="hidden" name="id" value={isEditing?.id || ""} />
              <input type="hidden" name="currentImageUrl" value={isEditing?.imageUrl || ""} />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title (Optional)</Label>
                  <Input name="title" defaultValue={isEditing?.title} className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle (Optional)</Label>
                  <Input name="subtitle" defaultValue={isEditing?.subtitle} className="bg-neutral-800 border-neutral-700" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Link URL</Label>
                <Input name="link" defaultValue={isEditing?.link} placeholder="/models/women" className="bg-neutral-800 border-neutral-700" />
              </div>

              <div className="space-y-4">
                <Label>Slide Image</Label>
                <div className="flex items-center gap-6">
                  <div className="relative w-48 aspect-[16/9] bg-neutral-800 rounded overflow-hidden border border-neutral-700">
                    {(preview || isEditing?.imageUrl) ? (
                      <Image src={preview || isEditing.imageUrl} alt="Slide preview" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600">
                        <ImageIcon className="w-8 h-8 mb-2" />
                        <span className="text-[10px] uppercase font-bold">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input type="file" name="image" accept="image/*" onChange={handleFileChange} className="bg-neutral-800 border-neutral-700" />
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Recommended: 1920x1080px WebP</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch name="active" id="active" defaultChecked={isEditing ? isEditing.active : true} />
                <Label htmlFor="active">Active Slide</Label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-white text-black hover:bg-neutral-200 px-8 uppercase tracking-widest text-xs font-bold">
                  {isEditing ? "Save Changes" : "Create Slide"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {slides.map((slide) => (
          <Card key={slide.id} className="bg-neutral-900 border-neutral-800 overflow-hidden">
            <CardContent className="p-0 flex items-center">
              <div className="w-64 aspect-[16/9] relative flex-shrink-0">
                <Image 
                  src={slide.imageUrl} 
                  alt={slide.title || "Slide"} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 100vw, 300px"
                  quality={60}
                />
              </div>
              <div className="flex-1 p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif">{slide.title || "Untitled Slide"}</h3>
                  <p className="text-neutral-500 text-sm">{slide.subtitle || slide.link || "No description"}</p>
                  {!slide.active && <span className="text-[10px] bg-red-500/10 text-red-500 uppercase font-bold tracking-widest px-2 py-0.5 rounded mt-2 inline-block">Hidden</span>}
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="text-neutral-400 hover:text-white" onClick={() => {
                    setIsEditing(slide);
                    setOpen(true);
                  }}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-300" onClick={async () => {
                    if (confirm("Delete this slide?")) {
                      await deleteHeroSlide(slide.id);
                    }
                  }}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {slides.length === 0 && (
          <div className="py-24 text-center border-2 border-dashed border-neutral-800 rounded-2xl">
            <p className="text-neutral-500 font-serif text-lg">No hero slides created yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
