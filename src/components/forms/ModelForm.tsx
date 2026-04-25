"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { X, Upload, Check, Image as ImageIcon, Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { createModel, updateModel, deleteModelImage, setPrimaryImage, toggleFaceImage, setSpecialRole } from "@/app/admin/models/actions";

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
                  <Label className="text-white">Full Name</Label>
                  <Input name="name" defaultValue={initialData?.name} required className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500" />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Location</Label>
                  <Input name="location" defaultValue={initialData?.location} placeholder="e.g. New York, London" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Biography</Label>
                <Textarea name="bio" defaultValue={initialData?.bio} className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 h-32" />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch name="featured" defaultChecked={initialData?.featured} id="featured" />
                <Label htmlFor="featured" className="text-white">Featured Talent</Label>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="pt-6">
              <Label className="text-lg font-serif mb-4 block text-white">Physical Attributes</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-neutral-400">Height</Label>
                  <Input name="height" defaultValue={initialData?.height} placeholder="5'10" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-neutral-400">Chest/Bust</Label>
                  <Input name="chest" defaultValue={initialData?.chest} placeholder="32" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-neutral-400">Waist</Label>
                  <Input name="waist" defaultValue={initialData?.waist} placeholder="24" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-neutral-400">Hips</Label>
                  <Input name="hips" defaultValue={initialData?.hips} placeholder="34" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-neutral-400">Hair</Label>
                  <Input name="hair" defaultValue={initialData?.hair} placeholder="Brown" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-neutral-400">Eyes</Label>
                  <Input name="eyes" defaultValue={initialData?.eyes} placeholder="Blue" className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="pt-6 space-y-4">
              <Label className="text-lg font-serif text-white">Portfolio Images</Label>
              
              <div className="grid grid-cols-2 gap-2">
                {existingImages.map((img: any) => (
                  <div key={img.id} className="relative aspect-[3/4] group">
                    <Image src={img.imageUrl} alt="Portfolio" fill className="object-cover rounded-md" />
                    
                    {/* Hover Overlay with specialized roles */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 gap-2">
                       <div className="flex gap-2 mb-1">
                        <Button type="button" size="icon" variant="ghost" title="Set Profile Primary" 
                                onClick={() => handleSetPrimary(initialData.id, img.id)} 
                                className={img.isPrimary ? "text-emerald-500" : "text-white"}>
                          <Check className="w-5 h-5" />
                        </Button>
                        <Button type="button" size="icon" variant="ghost" title="Delete Image" 
                                onClick={() => handleDeleteImage(img.id)} 
                                className="text-red-500">
                          <X className="w-5 h-5" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 w-full">
                        <Button type="button" variant="outline" size="sm" 
                                className={cn("text-[9px] h-7 border-white/20 uppercase tracking-tighter transition-all font-bold", img.isFace ? "bg-white text-black" : "text-white hover:bg-white/10")} 
                                onClick={() => toggleFaceImage(img.id, img.isFace)}>
                          {img.isFace ? "In Faces" : "Add Face"}
                        </Button>
                        <Button type="button" variant="outline" size="sm" 
                                className={cn("text-[9px] h-7 border-white/20 uppercase tracking-tighter transition-all font-bold", img.isPrimeAll ? "bg-white text-black" : "text-white hover:bg-white/10")} 
                                onClick={() => setSpecialRole(img.id, "isPrimeAll")}>
                          Prime-All
                        </Button>
                        <Button type="button" variant="outline" size="sm" 
                                className={cn("text-[9px] h-7 border-white/20 uppercase tracking-tighter transition-all font-bold", img.isPrimeWomen ? "bg-white text-black" : "text-white hover:bg-white/10")} 
                                onClick={() => setSpecialRole(img.id, "isPrimeWomen")}>
                          Prime-W
                        </Button>
                        <Button type="button" variant="outline" size="sm" 
                                className={cn("text-[9px] h-7 border-white/20 uppercase tracking-tighter transition-all font-bold", img.isPrimeMen ? "bg-white text-black" : "text-white hover:bg-white/10")} 
                                onClick={() => setSpecialRole(img.id, "isPrimeMen")}>
                          Prime-M
                        </Button>
                      </div>
                    </div>

                    {/* Active Status Badges */}
                    <div className="absolute top-1 left-1 flex flex-wrap gap-1 pointer-events-none">
                      {img.isPrimary && <Badge className="bg-emerald-500 hover:bg-emerald-500 text-[7px] h-3 px-1 border-none shadow-none">Primary</Badge>}
                      {img.isFace && <Badge className="bg-white text-black hover:bg-white text-[7px] h-3 px-1 border-none shadow-none">Face</Badge>}
                      {img.isPrimeAll && <Badge className="bg-blue-500 hover:bg-blue-500 text-white text-[7px] h-3 px-1 border-none shadow-none">All</Badge>}
                      {img.isPrimeWomen && <Badge className="bg-pink-500 hover:bg-pink-500 text-white text-[7px] h-3 px-1 border-none shadow-none">W-Prime</Badge>}
                      {img.isPrimeMen && <Badge className="bg-indigo-500 hover:bg-indigo-500 text-white text-[7px] h-3 px-1 border-none shadow-none">M-Prime</Badge>}
                    </div>
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
                  <Upload className="w-6 h-6 text-neutral-400" />
                  <span className="text-[10px] uppercase tracking-widest text-white/70">Upload</span>
                  <input type="file" name={initialData ? "newImages" : "images"} multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
              <p className="text-[10px] text-neutral-400 italic">Images will be automatically optimized to WebP format.</p>
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
