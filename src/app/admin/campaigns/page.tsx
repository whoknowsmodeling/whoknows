import { getCampaignsList, getSimpleModelsList } from "@/lib/edge-data";
import CampaignManagement from "@/components/admin/CampaignManagement";

export const runtime = 'edge';
export const dynamic = "force-dynamic";

export default async function AdminCampaignsPage() {
  const [campaigns, models] = await Promise.all([
    getCampaignsList(),
    getSimpleModelsList()
  ]);

  return <CampaignManagement campaigns={campaigns} models={models} />;
}
