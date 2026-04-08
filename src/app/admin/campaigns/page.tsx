import CampaignManagement from "@/components/admin/CampaignManagement";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminCampaignsPage() {
  const [campaigns, models] = await Promise.all([
    db.campaign.findMany({
      include: {
        models: {
          include: { model: true }
        }
      },
      orderBy: { createdAt: "desc" },
    }),
    db.model.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true }
    })
  ]);

  return <CampaignManagement campaigns={campaigns} models={models} />;
}
