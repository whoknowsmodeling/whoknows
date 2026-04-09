'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PaginatedApplicationsProps {
  initialApplications: any[];
  fetchMoreAction: (offset: number) => Promise<any[]>;
}

export function PaginatedApplications({ initialApplications, fetchMoreAction }: PaginatedApplicationsProps) {
  const [applications, setApplications] = useState(initialApplications);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialApplications.length >= 20);
  const [offset, setOffset] = useState(initialApplications.length);

  const loadMore = async () => {
    setLoading(true);
    try {
      const more = await fetchMoreAction(offset);
      if (more.length < 20) setHasMore(false);
      setApplications([...applications, ...more]);
      setOffset(offset + more.length);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        {applications.length > 0 ? (
          applications.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <Button 
            onClick={loadMore} 
            disabled={loading}
            variant="outline"
            className="px-10 py-6 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
            {loading ? 'Loading Submissions...' : 'Load More Applications'}
          </Button>
        </div>
      )}
    </>
  );
}

// Internal Sub-components for cleaner code
function ApplicationCard({ app }: { app: any }) {
  // Re-implemented from original Applications page for consistency
  return (
    <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all">
      <div className="p-6 lg:p-8 flex flex-col xl:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-serif font-medium text-white">{app.name}</h2>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-neutral-400">
                <span className="flex items-center gap-1.5">{app.email}</span>
                <span className="flex items-center gap-1.5">{app.city}, {app.country}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Status</p>
              <p className="text-blue-400 font-medium capitalize">{app.status}</p>
            </div>
            <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
               <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Height</p>
               <p className="text-white font-medium">{app.height || 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="xl:w-[300px] grid grid-cols-3 gap-2">
            {app.photos?.slice(0, 3).map((p: any) => (
                <div key={p.id} className="aspect-[3/4] relative rounded-md overflow-hidden bg-black">
                    <img src={p.imageUrl} className="object-cover w-full h-full" alt="Talent Preview" />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-24 text-center bg-neutral-900/20 border border-dashed border-neutral-800 rounded-xl text-neutral-600">
      No applications yet
    </div>
  );
}
