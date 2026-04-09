"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ImageIcon, Upload, X, Users } from "lucide-react";
import Image from "next/image";
import { createCampaign, deleteCampaign } from "@/app/admin/campaigns/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function CampaignManagement({ campaigns, models }: { campaigns: any[], models: any[] }) {
  const [open, setOpen] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const toggleModel = (id: string) => {
    setSelectedModels(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-medium">Campaigns</h1>
          <p className="text-neutral-500 text-sm">Manage editorial and commercial campaign showcases.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-neutral-200 uppercase tracking-widest text-xs px-6 py-4">
              <Plus className="w-4 h-4 mr-2" /> New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Create New Campaign</DialogTitle>
            </DialogHeader>
            <form action={async (formData) => {
              selectedModels.forEach(id => formData.append("modelIds", id));
              await createCampaign(formData);
              setOpen(false);
              setSelectedModels([]);
              setCoverPreview(null);
            }} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Campaign Title</Label>
                    <Input name="title" required className="bg-neutral-800 border-neutral-700" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Client</Label>
                      <Input name="client" className="bg-neutral-800 border-neutral-700" />
                    </div>
                    <div className="space-y-2">
                      <Label>Year</Label>
                      <Input name="year" className="bg-neutral-800 border-neutral-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea name="description" className="bg-neutral-800 border-neutral-700 h-24" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Cover Image</Label>
                  <div className="relative aspect-[3/4] bg-neutral-800 rounded overflow-hidden border border-neutral-700 group">
                    {coverPreview ? (
                      <Image src={coverPreview} alt="Cover preview" fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600">
                        <ImageIcon className="w-12 h-12 mb-2" />
                        <span className="text-xs uppercase font-bold tracking-widest">Select Cover</span>
                      </div>
                    )}
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                      <Upload className="w-8 h-8" />
                      <input type="file" name="coverImage" accept="image/*" onChange={handleCoverChange} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2"><Users className="w-4 h-4" /> Tag Models</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 border border-neutral-800 rounded bg-neutral-950/50">
                  {models.map(model => (
                    <div 
                      key={model.id} 
                      onClick={() => toggleModel(model.id)}
                      className={`cursor-pointer p-2 rounded border transition-all text-center ${
                        selectedModels.includes(model.id) 
                          ? "bg-white text-black border-white" 
                          : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-white/50"
                      }`}
                    >
                      <p className="text-[10px] font-medium truncate">{model.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Gallery Images</Label>
                <Input type="file" name="images" multiple accept="image/*" className="bg-neutral-800 border-neutral-700" />
              </div>

              <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-neutral-900 pb-2">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-white text-black hover:bg-neutral-200 px-8 uppercase tracking-widest text-xs font-bold">
                  Create Campaign
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="bg-neutral-900 border-neutral-800 overflow-hidden group">
            <div className="relative aspect-[3/4]">
              {campaign.coverImage && (
                <Image 
                  src={campaign.coverImage} 
                  alt={campaign.title} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 768px) 50vw, 400px"
                  quality={60}
                />
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300" onClick={async () => {
                  if (confirm("Delete this campaign?")) {
                    await deleteCampaign(campaign.id);
                  }
                }}>
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] uppercase tracking-widest text-neutral-500">{campaign.client} • {campaign.year}</p>
              </div>
              <CardTitle className="font-serif text-xl">{campaign.title}</CardTitle>
              <div className="flex flex-wrap gap-1 mt-3">
                {campaign.models.map((m: any) => (
                  <Badge key={m.model.id} variant="outline" className="text-[8px] bg-neutral-800 border-neutral-700 text-neutral-400">
                    {m.model.name}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>
        ))}

        {campaigns.length === 0 && (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-neutral-800 rounded-2xl">
            <p className="text-neutral-500 font-serif text-lg">No campaigns found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
