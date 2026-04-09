import { getApplicationsList } from "@/lib/edge-data";
import { fetchApplicationsAction } from "../actions";
import { PaginatedApplications } from "@/components/admin/PaginatedApplications";
import { Users } from "lucide-react";

export const revalidate = 0;

export default async function ApplicationsPage() {
  const initialApplications = await getApplicationsList(20, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-medium tracking-tight">Model Applications</h1>
          <p className="text-neutral-500 mt-2">New talent submissions for review.</p>
        </div>
        <div className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">Real-time Submissions</span>
        </div>
      </div>

      <PaginatedApplications 
        initialApplications={initialApplications} 
        fetchMoreAction={fetchApplicationsAction} 
      />
    </div>
  );
}
