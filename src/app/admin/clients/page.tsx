import { supabaseAdmin } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, ImageIcon, Upload, Save, X } from "lucide-react";
import Image from "next/image";
import { createClient, updateClient, deleteClient } from "./actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import ClientManagement from "@/components/admin/ClientManagement";

export const runtime = 'edge';
export const revalidate = 0;

export default async function AdminClientsPage() {
  const { data: clients } = await supabaseAdmin
    .from("Client")
    .select("*")
    .order("order", { ascending: true });

  return <ClientManagement initialClients={clients || []} />;
}
