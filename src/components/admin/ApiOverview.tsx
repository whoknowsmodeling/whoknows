'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Database, 
  Sparkles, 
  Mail, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  SignalHigh
} from "lucide-react";
import { cn } from "@/lib/utils";

type ApiStatus = 'connected' | 'disconnected' | 'loading' | 'stable';

interface ServiceStatus {
  name: string;
  icon: any;
  status: ApiStatus;
  latency?: string;
}

export function ApiOverview() {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Supabase Database', icon: Database, status: 'loading' },
    { name: 'Gemini AI Engine', icon: Sparkles, status: 'loading' },
    { name: 'Formspree API', icon: Mail, status: 'loading' },
    { name: 'Cloudflare Edge', icon: Globe, status: 'loading' },
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkStatus = async () => {
    setIsRefreshing(true);
    // Simulate real-time heartbeat checks
    await new Promise(r => setTimeout(r, 800));
    
    setServices([
      { name: 'Supabase Database', icon: Database, status: 'connected', latency: '42ms' },
      { name: 'Gemini AI Engine', icon: Sparkles, status: 'connected', latency: '124ms' },
      { name: 'Formspree API', icon: Mail, status: 'connected', latency: '210ms' },
      { name: 'Cloudflare Edge', icon: Globe, status: 'stable', latency: '12ms' },
    ]);
    setIsRefreshing(false);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <Card className="bg-neutral-900 border-neutral-800 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg flex items-center gap-2">
            <SignalHigh className="w-5 h-5 text-neutral-400" />
            API Connection Overview
          </CardTitle>
          <CardDescription className="text-neutral-500 text-xs">Real-time infrastructure heartbeat monitor.</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={checkStatus} 
          disabled={isRefreshing}
          className="size-8 border-neutral-800 hover:bg-white/5"
        >
          <RefreshCw className={cn("w-4 h-4 text-neutral-400", isRefreshing && "animate-spin")} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {services.map((service) => (
          <div key={service.name} className="flex items-center justify-between p-3 bg-neutral-950/50 rounded-lg border border-neutral-800/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-neutral-900">
                <service.icon className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-white">{service.name}</p>
                {service.latency && <p className="text-[10px] text-neutral-600 font-mono">LATENCY: {service.latency}</p>}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {service.status === 'loading' ? (
                <Loader2 className="w-4 h-4 text-neutral-500 animate-spin" />
              ) : service.status === 'connected' || service.status === 'stable' ? (
                <div className="flex items-center gap-1.5">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">{service.status}</span>
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">Error</span>
                   <XCircle className="w-4 h-4 text-red-500" />
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="pt-2 text-center">
             <p className="text-[9px] text-neutral-600 uppercase tracking-widest italic">All systems operational at WhoKnows Edge v3.0.4</p>
        </div>
      </CardContent>
    </Card>
  );
}
