'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, ImageIcon, Upload, Save, X, Edit2 } from "lucide-react";
import Image from "next/image";
import { createClient, updateClient, deleteClient } from "@/app/admin/clients/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface ClientManagementProps {
  initialClients: any[];
}

export default function ClientManagement({ initialClients }: ClientManagementProps) {
  const [open, setOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingClient(null);
      setLogoPreview(null);
    }
  };

  const handleEdit = (client: any) => {
    setEditingClient(client);
    setLogoPreview(client.logoUrl);
    setOpen(true);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-medium">Brand Partners</h1>
          <p className="text-neutral-500 text-sm">Manage logos for the &ldquo;Trusted by Leading Brands&rdquo; section.</p>
        </div>
        
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-neutral-200 uppercase tracking-widest text-xs px-6 py-4">
              <Plus className="w-4 h-4 mr-2" /> Add Partner
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border-neutral-800 text-white">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">
                {editingClient ? "Edit Partner" : "Add Brand Partner"}
              </DialogTitle>
            </DialogHeader>
            <form action={async (formData) => {
              try {
                if (editingClient) {
                  formData.append("id", editingClient.id);
                  if (editingClient.logoUrl) formData.append("existingLogoUrl", editingClient.logoUrl);
                  await updateClient(formData);
                  toast.success("Partner updated");
                } else {
                  await createClient(formData);
                  toast.success("Partner added");
                }
                handleOpenChange(false);
              } catch (e) {
                toast.error("Operation failed");
              }
            }} className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Brand Name</Label>
                  <Input name="name" required defaultValue={editingClient?.name} className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input name="order" type="number" defaultValue={editingClient?.order || 0} className="bg-neutral-800 border-neutral-700" />
                </div>
                <div className="flex items-center justify-between p-4 bg-neutral-950/50 border border-neutral-800 rounded-xl">
                    <div className="space-y-0.5">
                        <Label>Visible on Website</Label>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-tighter">Show this logo on the landing page</p>
                    </div>
                    <Switch name="active" defaultChecked={editingClient ? editingClient.active : true} />
                </div>
                
                <div className="space-y-2">
                  <Label>Brand Logo (SVG or Transparent PNG preferred)</Label>
                  <div className="relative aspect-video bg-neutral-800 rounded overflow-hidden border border-neutral-700 group flex items-center justify-center p-8">
                    {logoPreview ? (
                      <div className="relative w-full h-full">
                        <Image src={logoPreview} alt="Logo preview" fill className="object-contain filter brightness-200" />
                      </div>
                    ) : (
                      <ImageIcon className="w-12 h-12 text-neutral-700" />
                    )}
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                      <Upload className="w-8 h-8" />
                      <input type="file" name="logo" accept="image/*" onChange={handleLogoChange} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>Cancel</Button>
                <Button type="submit" className="bg-white text-black hover:bg-neutral-200 px-8 uppercase tracking-widest text-xs font-bold">
                  {editingClient ? "Save Changes" : "Create Partner"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {initialClients.map((client) => (
          <Card key={client.id} className={`bg-neutral-900 border-neutral-800 overflow-hidden group ${!client.active && 'opacity-60'}`}>
            <div className="relative aspect-square flex items-center justify-center p-8 bg-neutral-950/50">
              {client.logoUrl ? (
                <div className="relative w-full h-full">
                   <Image 
                    src={client.logoUrl} 
                    alt={client.name} 
                    fill 
                    className="object-contain filter grayscale brightness-200 group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
              ) : (
                <ImageIcon className="w-12 h-12 text-neutral-800" />
              )}
              
              <div className="absolute top-2 right-2">
                 {!client.active && <Badge variant="destructive" className="text-[8px] uppercase tracking-tighter">Inactive</Badge>}
              </div>

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => handleEdit(client)}>
                  <Edit2 className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300" onClick={async () => {
                  if (confirm(`Delete ${client.name}?`)) {
                    await deleteClient(client.id);
                    toast.success("Partner deleted");
                  }
                }}>
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <CardHeader className="p-4">
               <div className="space-y-1">
                <CardTitle className="text-sm font-serif text-white">{client.name}</CardTitle>
                <p className="text-[10px] uppercase text-neutral-500 tracking-widest font-bold">Order Index: {client.order}</p>
              </div>
            </CardHeader>
          </Card>
        ))}

        {initialClients.length === 0 && (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-neutral-800 rounded-2xl">
            <p className="text-neutral-500 font-serif text-lg text-white">No brand partners found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
