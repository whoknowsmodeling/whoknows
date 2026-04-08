import { db } from "@/lib/db";
import { format } from "date-fns";
import { 
  Activity, 
  User, 
  Calendar, 
  Tag, 
  Info,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

export const revalidate = 0; // Disable caching for the log page

export default async function LogsPage() {
  const logs = await db.adminLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-medium tracking-tight">Activity Logs</h1>
          <p className="text-neutral-500 mt-2">Track all administrative changes across the platform.</p>
        </div>
        <div className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium">{logs.length} Recent Actions</span>
        </div>
      </div>

      <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-900/80">
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-neutral-500 font-semibold border-b border-neutral-800">Time</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-neutral-500 font-semibold border-b border-neutral-800">Admin</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-neutral-500 font-semibold border-b border-neutral-800">Action</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-neutral-500 font-semibold border-b border-neutral-800">Entity</th>
                <th className="px-6 py-4 text-xs uppercase tracking-widest text-neutral-500 font-semibold border-b border-neutral-800">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-neutral-300">
                          {format(new Date(log.createdAt), "MMM d, yyyy")}
                        </span>
                        <span className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {format(new Date(log.createdAt), "HH:mm:ss")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center">
                          <User className="w-3 h-3 text-neutral-400" />
                        </div>
                        <span className="text-sm text-neutral-300">{log.adminEmail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider",
                        log.action === 'create' ? "bg-green-500/10 text-green-400" :
                        log.action === 'update' ? "bg-blue-500/10 text-blue-400" :
                        log.action === 'delete' ? "bg-red-500/10 text-red-400" :
                        "bg-neutral-800 text-neutral-400"
                      )}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3 h-3 text-neutral-500" />
                        <span className="text-sm font-medium text-neutral-300 capitalize">{log.entity}</span>
                        {log.entityId && (
                          <span className="text-[10px] text-neutral-600 font-mono">#{log.entityId.slice(-6)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2 max-w-md">
                        <Info className="w-4 h-4 text-neutral-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-neutral-400 leading-relaxed italic">
                          {log.details || "No additional details provided."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-500 italic">
                    No activity logs found. All future dashboard changes will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
