import { supabaseAdmin } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, ExternalLink, ImageIcon } from "lucide-react";
import Image from "next/image";

export const runtime = 'edge';
export const revalidate = 0;

export default async function AdminClientsPage() {
  const { data: clients } = await supabaseAdmin
    .from("Client")
    .select("*")
    .order("order", { ascending: true });

  const activeClients = clients?.filter(c => c.active) || [];
  const inactiveClients = clients?.filter(c => !c.active) || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-medium">Brand Partners</h1>
          <p className="text-neutral-500 text-sm">Manage logos for the &ldquo;Trusted by Leading Brands&rdquo; section.</p>
        </div>
        <Button className="bg-white text-black hover:bg-neutral-200 uppercase tracking-widest text-xs px-6 py-4">
          <Plus className="w-4 h-4 mr-2" /> Add Client
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clients?.map((client) => (
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
            </div>
            
            <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-sm font-serif text-white">{client.name}</CardTitle>
                <p className="text-[10px] uppercase text-neutral-500">Order: {client.order}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}

        {(!clients || clients.length === 0) && (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-neutral-800 rounded-2xl">
            <p className="text-neutral-500 font-serif text-lg">No brand partners found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
