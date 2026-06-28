import { supabaseAdmin } from "@/lib/supabase";
import WebsiteSettingsForm from "@/components/admin/WebsiteSettingsForm";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const { data: settings } = await supabaseAdmin
    .from("website_settings")
    .select("*")
    .eq("id", "default")
    .single();

  const systemInfo = {
    websiteName: "WhoKnows Models",
    websiteUrl: "https://whoknowsmodels.com",
    environment: process.env.NODE_ENV || "development",
    version: "1.2.0",
  };

  return <WebsiteSettingsForm settings={settings} systemInfo={systemInfo} />;
}
