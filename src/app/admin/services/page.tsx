'use client';

import { useState, useEffect, useCallback } from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import {
  Layers, RefreshCw, Loader2, Globe, ExternalLink, Trash2, 
  Settings2, Plus, Search, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ClusterPage {
  id: string;
  title: string;
  slug: string;
  clusterCategory: string;
  clusterSlug: string;
  status: string;
  createdAt: string;
  seoMetadata: {
    targetKeyword?: string;
  } | null;
}

export default function ClusterEnginePage() {
  const [pages, setPages] = useState<ClusterPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setPages(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch cluster pages:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPages(); }, [fetchPages]);

  const filteredPages = pages.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.clusterCategory.toLowerCase().includes(search.toLowerCase())
  );

  const columns: ColumnDef<ClusterPage>[] = [
    {
      accessorKey: 'title',
      header: 'Landing Page',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-white font-medium text-sm leading-none flex items-center gap-2">
            {row.original.title}
          </span>
          <span className="text-neutral-500 text-[10px] font-mono mt-1.5 uppercase tracking-tighter">
            Services /{row.original.clusterSlug}/{row.original.slug}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'clusterCategory',
      header: 'Category Cluster',
      cell: ({ getValue }) => (
        <Badge variant="secondary" className="bg-neutral-800 text-neutral-400 border-neutral-700 text-[10px] uppercase font-mono tracking-widest">
          {getValue() as string}
        </Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]",
              status === 'PUBLISHED' ? "bg-emerald-500 shadow-emerald-500/50" : "bg-amber-500 shadow-amber-500/50"
            )} />
            <span className={cn(
              "text-[10px] uppercase font-bold tracking-widest",
              status === 'PUBLISHED' ? "text-emerald-500/80" : "text-amber-500/80"
            )}>
              {status}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Generated',
      cell: ({ getValue }) => (
        <span className="text-neutral-500 text-[10px] font-mono">
          {format(new Date(getValue() as string), 'yyyy-MM-dd')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <a
            href={`/services/${row.original.clusterSlug}/${row.original.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all">
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredPages,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1 bg-violet-600 rounded-full" />
            <h1 className="text-3xl font-serif font-light tracking-tight text-white">Cluster Engine</h1>
          </div>
          <p className="text-neutral-500 text-sm max-w-xl">
            Programmatic SEO Infrastructure for targeting industrial niches. 
            All pages are AI-drafted for conversion and premium aesthetic alignment.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
            <Input 
              placeholder="Filter clusters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 w-64 bg-neutral-900/50 border-neutral-800 text-xs placeholder:text-neutral-600 focus-visible:ring-violet-500/40"
            />
          </div>
          <Button variant="outline" size="icon" onClick={fetchPages} disabled={loading} className="h-10 w-10 border-neutral-800 bg-neutral-900/50">
            <RefreshCw className={cn("w-4 h-4 text-neutral-500", loading && "animate-spin")} />
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-500 text-white h-10 gap-2">
            <Plus className="w-4 h-4" /> Generate Cluster
          </Button>
        </div>
      </div>

      {/* Roster Table */}
      <Card className="bg-neutral-900/30 border-neutral-800/60 backdrop-blur-sm">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4">
              <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
              <p className="text-sm font-mono text-neutral-600 uppercase tracking-widest">Accessing Cluster Vault...</p>
            </div>
          ) : filteredPages.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-2">
                <Globe className="w-8 h-8 text-neutral-700" />
              </div>
              <h3 className="text-white font-serif text-lg">No SEO Pages Discovered</h3>
              <p className="text-neutral-500 text-sm max-w-xs mx-auto">
                The programmatic engine hasn't deployed any clusters yet. Use the generate button to begin expansion.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map(hg => (
                    <tr key={hg.id} className="border-b border-neutral-800/80 bg-neutral-900/40">
                      {hg.headers.map(header => (
                        <th key={header.id} className="px-6 py-4 text-left text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-neutral-800/40">
                  {table.getRowModel().rows.map((row, idx) => (
                    <tr 
                      key={row.id} 
                      className={cn(
                        "group hover:bg-white/5 transition-all duration-300",
                        idx % 2 === 0 ? "bg-transparent" : "bg-neutral-900/20"
                      )}
                    >
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-6 py-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Industry Insights Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="p-6 rounded-2xl border border-neutral-800/50 bg-neutral-950/20">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-4" />
          <h4 className="text-white text-sm font-medium mb-2 uppercase tracking-wider">SEO Integrity</h4>
          <p className="text-neutral-500 text-xs leading-relaxed">Generated clusters automatically follow 100% semantic schema standards for industrial discovery.</p>
        </div>
        <div className="p-6 rounded-2xl border border-neutral-800/50 bg-neutral-950/20">
          <Plus className="w-5 h-5 text-violet-500 mb-4" />
          <h4 className="text-white text-sm font-medium mb-2 uppercase tracking-wider">Persona Sync</h4>
          <p className="text-neutral-500 text-xs leading-relaxed">Each niche page is drafted using the OpenAI-refined Persona sync protocol for elite conversion.</p>
        </div>
        <div className="p-6 rounded-2xl border border-neutral-800/50 bg-neutral-950/20">
          <AlertCircle className="w-5 h-5 text-amber-500 mb-4" />
          <h4 className="text-white text-sm font-medium mb-2 uppercase tracking-wider">Dynamic Roster</h4>
          <p className="text-neutral-500 text-xs leading-relaxed">The talent featured on these pages is live-synced from the industrial roster, ensuring zero dead-links.</p>
        </div>
      </div>
    </div>
  );
}
