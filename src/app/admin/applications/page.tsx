import { db } from "@/lib/db";
import { format } from "date-fns";
import { 
  Users, 
  Trash2, 
  Eye,
  Instagram,
  Mail,
  Smartphone,
  MapPin,
  Ruler,
  Calendar,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Image from "next/image";

export const revalidate = 0;

async function deleteApplication(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  await db.application.delete({
    where: { id }
  });
  revalidatePath('/admin/applications');
}

export default async function ApplicationsPage() {
  const applications = await db.application.findMany({
    include: {
      photos: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-medium tracking-tight">Model Applications</h1>
          <p className="text-neutral-500 mt-2">New talent submissions for review.</p>
        </div>
        <div className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">{applications.length} Submissions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app.id} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all">
              <div className="p-6 lg:p-8 flex flex-col xl:flex-row gap-8">
                {/* Info Column */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-serif font-medium text-white">{app.name}</h2>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-neutral-400">
                        <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-neutral-500" /> {app.email}</span>
                        <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-neutral-500" /> {app.phone || 'No Phone'}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-neutral-500" /> {app.city}, {app.country}</span>
                      </div>
                    </div>
                    <form action={deleteApplication}>
                      <input type="hidden" name="id" value={app.id} />
                      <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                      <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Age</p>
                      <p className="text-white font-medium">{app.age || 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                      <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Height</p>
                      <p className="text-white font-medium">{app.height || 'N/A'}</p>
                    </div>
                    <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                      <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Created</p>
                      <p className="text-white font-medium">{format(new Date(app.createdAt), "MMM d, yyyy")}</p>
                    </div>
                    <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                      <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1">Status</p>
                      <p className="text-blue-400 font-medium capitalize">{app.status}</p>
                    </div>
                  </div>

                  {app.instagram && (
                    <a 
                      href={`https://instagram.com/${app.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                      @{app.instagram.replace('@', '')}
                    </a>
                  )}

                  {app.message && (
                    <div className="p-4 bg-black/40 rounded-xl border border-neutral-800/50 italic text-neutral-400 text-sm leading-relaxed">
                      "{app.message}"
                    </div>
                  )}
                </div>

                {/* Photos Column */}
                <div className="xl:w-[450px] space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-neutral-300 mb-2">
                    <ImageIcon className="w-4 h-4" />
                    Uploaded Photos ({app.photos.length})
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {app.photos.map((photo) => (
                      <div key={photo.id} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-neutral-900 group">
                        {/* 
                          Note: In development, these URLs might be local paths.
                          Ideally use a real storage service.
                        */}
                        <img 
                          src={photo.imageUrl} 
                          alt={photo.type} 
                          className="object-cover w-full h-full" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                          <p className="text-[10px] text-white uppercase font-bold tracking-tighter">{photo.type}</p>
                          <a 
                            href={photo.imageUrl} 
                            target="_blank" 
                            className="mt-2 text-[10px] bg-white text-black px-2 py-1 rounded font-bold"
                          >
                            View Full
                          </a>
                        </div>
                      </div>
                    ))}
                    {app.photos.length === 0 && (
                      <div className="col-span-3 py-12 text-center border-2 border-dashed border-neutral-800 rounded-xl text-neutral-600">
                        No photos attached
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 text-center bg-neutral-900/20 border border-dashed border-neutral-800 rounded-xl">
            <Users className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-400">No applications yet</h3>
            <p className="text-neutral-600">Talent applications from the submission form will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
