import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Image as ImageIcon, MessageSquare, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, ChevronRight } from "lucide-react";
import { getDashboardStats, getAdminLogs } from "@/lib/edge-data";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function AdminDashboardPage() {
  const [stats, logs] = await Promise.all([
    getDashboardStats(),
    getAdminLogs()
  ]);

  const cards = [
    { title: "Men Models", value: stats.men, icon: Users, color: "text-blue-500", trend: "+2 this month", trendUp: true },
    { title: "Women Models", value: stats.women, icon: Users, color: "text-pink-500", trend: "+5 this month", trendUp: true },
    { title: "Live Campaigns", value: stats.campaigns, icon: ImageIcon, color: "text-amber-500", trend: "Stable", trendUp: true },
    { title: "Pending Applications", value: stats.pendingApps, icon: MessageSquare, color: "text-emerald-500", trend: "-12% vs last week", trendUp: false },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-serif font-medium tracking-tight mb-2">Workspace Overview</h1>
        <p className="text-neutral-500 text-sm">Welcome back, Admin. Here is what&apos;s happening across WhoKnows Models today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card key={card.title} className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-colors group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-medium uppercase tracking-widest text-neutral-400">
                {card.title}
              </CardTitle>
              <card.icon className={`w-4 h-4 ${card.color} group-hover:scale-125 transition-transform`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-medium text-white mb-1">{card.value}</div>
              <div className="flex items-center gap-1">
                {card.trendUp ? (
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500" />
                )}
                <span className={card.trendUp ? "text-emerald-500 text-[10px] font-medium" : "text-red-500 text-[10px] font-medium"}>
                  {card.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-neutral-400" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-neutral-500">Latest updates to the talent roster and campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {logs.slice(0, 5).map((log, i) => (
                <div key={i} className="flex items-center justify-between border-b border-neutral-800 pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white capitalize">{log.action} {log.entity}</p>
                    <p className="text-xs text-neutral-500 truncate max-w-[150px] md:max-w-none">{log.details || `ID: ${log.entityId}`}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-400 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(new Date(log.createdAt))} ago
                    </p>
                    <p className="text-[10px] text-neutral-600 uppercase tracking-tighter">By {log.adminEmail}</p>
                  </div>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="py-12 text-center text-neutral-500 italic text-sm">
                  No activity logs recorded yet.
                </div>
              )}
            </div>
            <Link href="/admin/logs">
              <Button variant="link" className="mt-6 text-xs text-neutral-500 p-0 hover:text-white transition-colors">
                View All Activity <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/models/women/new" className="block">
              <Button className="w-full bg-white text-black hover:bg-neutral-200 transition-colors py-6 text-xs uppercase tracking-widest">
                Add New Model
              </Button>
            </Link>
            <Link href="/admin/campaigns" className="block">
              <Button className="w-full border-neutral-700 hover:bg-white/5 transition-all py-6 text-xs uppercase tracking-widest" variant="outline">
                Create Campaign
              </Button>
            </Link>
            <Link href="/admin/content" className="block">
              <Button className="w-full border-neutral-700 hover:bg-white/5 transition-all py-6 text-xs uppercase tracking-widest" variant="outline">
                Update Page Content
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
