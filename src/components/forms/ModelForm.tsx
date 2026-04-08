"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { X, Upload, Check, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { createModel, updateModel, deleteModelImage, setPrimaryImage } from "@/app/admin/models/actions";

interface ModelFormProps {
  initialData?: any;
  gender: string;
}

export default function ModelForm({ initialData, gender }: ModelFormProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState(initialData?.images || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removePreview = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteImage = async (imageId: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await deleteModelImage(imageId);
      setExistingImages(prev => prev.filter((img: any) => img.id !== imageId));
    }
  };

  const handleSetPrimary = async (modelId: string, imageId: string) => {
    await setPrimaryImage(modelId, imageId);
    setExistingImages(prev => prev.map((img: any) => ({
      ...img,
      isPrimary: img.id === imageId
    })));
  };

  return (
    <form 
      action={async (formData) => {
        setIsSubmitting(true);
        if (initialData) {
          await updateModel(initialData.id, formData);
        } else {
          await createModel(formData);
        }
        setIsSubmitting(false);
      }}
      className="space-y-8"
    >
      <input type="hidden" name="gender" value={gender} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input name="name" defaultValue={initialData?.name} required className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input name="location" defaultValue={initialData?.location} placeholder="e.g. New York, London" className="bg-neutral-800 border-neutral-700" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Biography</Label>
                <Textarea name="bio" defaultValue={initialData?.bio} className="bg-neutral-800 border-neutral-700 h-32" />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch name="featured" defaultChecked={initialData?.featured} id="featured" />
                <Label htmlFor="featured">Featured Talent</Label>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="pt-6">
              <Label className="text-lg font-serif mb-4 block">Physical Attributes</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-neutral-500">Height</Label>
                  <Input name="height" defaultValue={initialData?.height} placeholder="5'10" className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-neutral-500">Chest/Bust</Label>
                  <Input name="chest" defaultValue={initialData?.chest} placeholder="32" className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-neutral-500">Waist</Label>
                  <Input name="waist" defaultValue={initialData?.waist} placeholder="24" className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-neutral-500">Hips</Label>
                  <Input name="hips" defaultValue={initialData?.hips} placeholder="34" className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-neutral-500">Hair</Label>
                  <Input name="hair" defaultValue={initialData?.hair} placeholder="Brown" className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-neutral-500">Eyes</Label>
                  <Input name="eyes" defaultValue={initialData?.eyes} placeholder="Blue" className="bg-neutral-800 border-neutral-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="pt-6 space-y-4">
              <Label className="text-lg font-serif">Portfolio Images</Label>
              
              <div className="grid grid-cols-2 gap-2">
                {existingImages.map((img: any) => (
                  <div key={img.id} className="relative aspect-[3/4] group">
                    <Image src={img.imageUrl} alt="Portfolio" fill className="object-cover rounded-md" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button type="button" size="icon" variant="ghost" onClick={() => handleSetPrimary(initialData.id, img.id)} className={img.isPrimary ? "text-emerald-500" : "text-white"}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button type="button" size="icon" variant="ghost" onClick={() => handleDeleteImage(img.id)} className="text-red-500">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {img.isPrimary && <div className="absolute top-1 left-1 bg-emerald-500 text-[8px] uppercase font-bold px-1 rounded">Primary</div>}
                  </div>
                ))}
                
                {previews.map((url, i) => (
                  <div key={url} className="relative aspect-[3/4]">
                    <Image src={url} alt="Preview" fill className="object-cover rounded-md opacity-60" />
                    <Button type="button" size="icon" variant="ghost" onClick={() => removePreview(i)} className="absolute top-1 right-1 text-red-500 h-6 w-6">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}

                <label className="aspect-[3/4] border-2 border-dashed border-neutral-800 hover:border-neutral-700 rounded-md cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors">
                  <Upload className="w-6 h-6 text-neutral-500" />
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500">Upload</span>
                  <input type="file" name={initialData ? "newImages" : "images"} multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
              <p className="text-[10px] text-neutral-500 italic">Images will be automatically optimized to WebP format.</p>
            </CardContent>
          </Card>

          <div className="pt-4">
            <Button disabled={isSubmitting} type="submit" className="w-full bg-white text-black hover:bg-neutral-200 py-8 uppercase tracking-widest text-xs font-bold">
              {isSubmitting ? "Processing..." : (initialData ? "Save Changes" : "Create Model")}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
