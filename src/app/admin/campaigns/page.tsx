import { getCampaignsList, getSimpleModelsList } from "@/lib/admin-data";

export const runtime = 'edge';
export const dynamic = "force-dynamic";

export default async function AdminCampaignsPage() {
  const [campaigns, models] = await Promise.all([
    getCampaignsList(),
    getSimpleModelsList()
  ]);

  return <CampaignManagement campaigns={campaigns} models={models} />;
}
