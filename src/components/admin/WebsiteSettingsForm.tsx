"use client";

import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, ShieldAlert, Laptop, Lock, RefreshCw, Eye, EyeOff } from "lucide-react";
import { updateGeneralSettings, updateWebsitePassword, updateAdminPassword } from "@/app/admin/settings/actions";

interface WebsiteSettingsFormProps {
  settings: any;
  systemInfo: {
    websiteName: string;
    websiteUrl: string;
    environment: string;
    version: string;
  };
}

export default function WebsiteSettingsForm({ settings, systemInfo }: WebsiteSettingsFormProps) {
  // --- STATE FOR GENERAL / MAINTENANCE ---
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(settings?.maintenance_enabled || false);
  const [allowAdminPassword, setAllowAdminPassword] = useState(settings?.allow_admin_password || false);
  const [generalLoading, setGeneralLoading] = useState(false);
  
  // Image previews
  const [logoPreview, setLogoPreview] = useState<string | null>(settings?.logo || null);
  const [bgPreview, setBgPreview] = useState<string | null>(settings?.background_image || null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bgFile, setBgFile] = useState<File | null>(null);

  // --- STATE FOR ACCESS PASSWORD ---
  const [accessPassword, setAccessPassword] = useState("");
  const [confirmAccessPassword, setConfirmAccessPassword] = useState("");
  const [showAccessPassword, setShowAccessPassword] = useState(false);
  const [showConfirmAccessPassword, setShowConfirmAccessPassword] = useState(false);
  const [accessPasswordLoading, setAccessPasswordLoading] = useState(false);

  // --- STATE FOR ADMIN PASSWORD ---
  const [currentAdminPassword, setCurrentAdminPassword] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [confirmAdminPassword, setConfirmAdminPassword] = useState("");
  const [showCurrentAdminPassword, setShowCurrentAdminPassword] = useState(false);
  const [showNewAdminPassword, setShowNewAdminPassword] = useState(false);
  const [showConfirmAdminPassword, setShowConfirmAdminPassword] = useState(false);
  const [adminPasswordLoading, setAdminPasswordLoading] = useState(false);

  // --- GENERAL HANDLERS ---
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBgFile(file);
      setBgPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const handleRemoveBg = () => {
    setBgFile(null);
    setBgPreview(null);
  };

  const handleSaveGeneral = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("maintenance_enabled", maintenanceEnabled ? "on" : "off");
      formData.set("allow_admin_password", allowAdminPassword ? "on" : "off");

      if (logoFile) formData.set("logo", logoFile);
      else if (!logoPreview) formData.set("logo_deleted", "true");

      if (bgFile) formData.set("background_image", bgFile);
      else if (!bgPreview) formData.set("background_deleted", "true");

      const res = await updateGeneralSettings(formData);
      if (res.success) {
        toast.success("Pengaturan website berhasil disimpan!");
      } else {
        toast.error(res.error || "Gagal menyimpan pengaturan.");
      }
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan.");
    } finally {
      setGeneralLoading(false);
    }
  };

  const handleUpdateAccessPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (accessPassword !== confirmAccessPassword) {
      toast.error("Konfirmasi password akses tidak cocok!");
      return;
    }
    setAccessPasswordLoading(true);

    try {
      const res = await updateWebsitePassword(accessPassword);
      if (res.success) {
        toast.success("Password akses website berhasil diperbarui!");
        setAccessPassword("");
        setConfirmAccessPassword("");
      } else {
        toast.error(res.error || "Gagal memperbarui password akses.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan.");
    } finally {
      setAccessPasswordLoading(false);
    }
  };

  const handleUpdateAdminPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAdminPassword !== confirmAdminPassword) {
      toast.error("Konfirmasi password admin baru tidak cocok!");
      return;
    }
    setAdminPasswordLoading(true);

    try {
      const res = await updateAdminPassword(currentAdminPassword, newAdminPassword);
      if (res.success) {
        toast.success("Password login Admin berhasil diperbarui!");
        setCurrentAdminPassword("");
        setNewAdminPassword("");
        setConfirmAdminPassword("");
      } else {
        toast.error(res.error || "Gagal memperbarui password admin.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan.");
    } finally {
      setAdminPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-medium tracking-tight">Website Settings</h1>
        <p className="text-neutral-500 mt-2">Manage maintenance mode settings, logos, backgrounds, and access control.</p>
      </div>

      <Tabs defaultValue="maintenance" className="w-full">
        <TabsList className="bg-neutral-900 border border-neutral-800 p-1 mb-6">
          <TabsTrigger value="general" className="px-6">General Info</TabsTrigger>
          <TabsTrigger value="maintenance" className="px-6">Maintenance Mode</TabsTrigger>
          <TabsTrigger value="security" className="px-6">Security & Admin</TabsTrigger>
        </TabsList>

        {/* --- GENERAL INFO TAB --- */}
        <TabsContent value="general" className="space-y-6 outline-none">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="font-serif text-xl flex items-center gap-2">
                <Laptop className="w-5 h-5 text-neutral-400" /> System Information
              </CardTitle>
              <CardDescription className="text-neutral-500 uppercase tracking-widest text-[10px]">
                Read-only system environment variables
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-neutral-950/50 rounded-lg border border-neutral-800/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Website Name</span>
                  <p className="text-sm font-medium text-white">{systemInfo.websiteName}</p>
                </div>

                <div className="p-4 bg-neutral-950/50 rounded-lg border border-neutral-800/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Website URL</span>
                  <p className="text-sm font-medium text-blue-400">{systemInfo.websiteUrl}</p>
                </div>

                <div className="p-4 bg-neutral-950/50 rounded-lg border border-neutral-800/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Environment</span>
                  <p className="text-sm font-medium text-white capitalize">{systemInfo.environment}</p>
                </div>

                <div className="p-4 bg-neutral-950/50 rounded-lg border border-neutral-800/50 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Version</span>
                  <p className="text-sm font-medium text-white">{systemInfo.version}</p>
                </div>
              </div>

              {settings?.updated_at && (
                <div className="pt-4 border-t border-neutral-800 flex justify-between text-xs text-neutral-500">
                  <span>Last Updated: {new Date(settings.updated_at).toLocaleString("id-ID")}</span>
                  {settings.updated_by && <span>By: {settings.updated_by}</span>}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- MAINTENANCE MODE TAB --- */}
        <TabsContent value="maintenance" className="space-y-6 outline-none">
          <form onSubmit={handleSaveGeneral} className="space-y-6">
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader className="border-b border-neutral-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="font-serif text-xl flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-neutral-400" /> Maintenance Configuration
                    </CardTitle>
                    <CardDescription className="text-neutral-500">
                      Toggle maintenance mode and customize the visitor landing page.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3 bg-neutral-950/50 border border-neutral-800 px-4 py-2 rounded-xl">
                    <Label htmlFor="maintenance_toggle" className="text-xs uppercase tracking-widest font-semibold cursor-pointer">
                      {maintenanceEnabled ? "Active (ON)" : "Inactive (OFF)"}
                    </Label>
                    <Switch
                      id="maintenance_toggle"
                      checked={maintenanceEnabled}
                      onCheckedChange={setMaintenanceEnabled}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-8">
                {/* Visual Assets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Logo Upload */}
                  <div className="space-y-3">
                    <Label className="text-xs uppercase text-neutral-400 font-bold tracking-widest">Maintenance Logo</Label>
                    <div className="border border-dashed border-neutral-800 rounded-xl p-4 bg-neutral-950/20 flex flex-col items-center justify-center text-center group relative min-h-[120px]">
                      {logoPreview ? (
                        <div className="relative w-full h-16">
                          <Image src={logoPreview} alt="Logo Preview" fill className="object-contain" />
                          <button
                            type="button"
                            onClick={handleRemoveLogo}
                            className="absolute -top-2 -right-2 bg-red-950 border border-red-800 text-red-200 rounded-full p-1 hover:bg-red-900 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center gap-2 text-neutral-500 hover:text-white transition-colors">
                          <Upload className="w-6 h-6" />
                          <span className="text-[10px] uppercase font-semibold tracking-wider">Upload Logo</span>
                          <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Background Image Upload */}
                  <div className="space-y-3">
                    <Label className="text-xs uppercase text-neutral-400 font-bold tracking-widest">Maintenance Background Image</Label>
                    <div className="border border-dashed border-neutral-800 rounded-xl p-4 bg-neutral-950/20 flex flex-col items-center justify-center text-center group relative min-h-[120px]">
                      {bgPreview ? (
                        <div className="relative w-full h-16">
                          <Image src={bgPreview} alt="Background Preview" fill className="object-contain" />
                          <button
                            type="button"
                            onClick={handleRemoveBg}
                            className="absolute -top-2 -right-2 bg-red-950 border border-red-800 text-red-200 rounded-full p-1 hover:bg-red-900 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center gap-2 text-neutral-500 hover:text-white transition-colors">
                          <Upload className="w-6 h-6" />
                          <span className="text-[10px] uppercase font-semibold tracking-wider">Upload Background</span>
                          <input type="file" accept="image/*" onChange={handleBgChange} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Customization */}
                <div className="space-y-6 pt-4 border-t border-neutral-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase text-neutral-400">Maintenance Title</Label>
                      <Input
                        name="maintenance_title"
                        defaultValue={settings?.maintenance_title || "Under Maintenance"}
                        className="bg-neutral-800 border-neutral-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase text-neutral-400">Maintenance Subtitle</Label>
                      <Input
                        name="maintenance_subtitle"
                        defaultValue={settings?.maintenance_subtitle || "We'll be back shortly."}
                        className="bg-neutral-800 border-neutral-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-neutral-400">Description</Label>
                    <Textarea
                      name="maintenance_description"
                      defaultValue={settings?.maintenance_description || "The site is currently undergoing scheduled maintenance. Please check back soon."}
                      className="bg-neutral-800 border-neutral-700 text-white min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase text-neutral-400">Enter Button Text</Label>
                      <Input
                        name="button_text"
                        defaultValue={settings?.button_text || "Enter"}
                        className="bg-neutral-800 border-neutral-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase text-neutral-400">Password Placeholder</Label>
                      <Input
                        name="password_placeholder"
                        defaultValue={settings?.password_placeholder || "Enter Password"}
                        className="bg-neutral-800 border-neutral-700 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase text-neutral-400">Footer Text</Label>
                      <Input
                        name="footer_text"
                        defaultValue={settings?.footer_text || "© WhoKnows Models. All Rights Reserved."}
                        className="bg-neutral-800 border-neutral-700 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase text-neutral-400">Contact Email (Optional)</Label>
                      <Input
                        name="contact_email"
                        type="email"
                        defaultValue={settings?.contact_email || ""}
                        placeholder="info@whoknowsmodels.com"
                        className="bg-neutral-800 border-neutral-700 text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Allow Admin Checkbox */}
                <div className="pt-6 border-t border-neutral-800 flex items-start gap-3">
                  <Checkbox
                    id="allow_admin_password"
                    checked={allowAdminPassword}
                    onCheckedChange={(checked) => setAllowAdminPassword(!!checked)}
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="allow_admin_password" className="text-sm font-medium leading-none cursor-pointer">
                      Allow Admin Login Password During Maintenance
                    </Label>
                    <p className="text-xs text-neutral-500">
                      If enabled, the main Admin Login Password can also be used by visitors to unlock and preview the website.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={generalLoading} className="bg-white text-black hover:bg-neutral-200 uppercase tracking-widest text-xs font-bold px-8">
                    {generalLoading ? "Saving..." : "Save Settings"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>

          {/* Website Access Password Section */}
          <form onSubmit={handleUpdateAccessPassword}>
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle className="font-serif text-lg flex items-center gap-2">
                  <Lock className="w-5 h-5 text-neutral-400" /> Website Access Password
                </CardTitle>
                <CardDescription className="text-neutral-500">
                  Set a dedicated bypass password for public visitors during maintenance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-neutral-400">Website Access Password</Label>
                    <div className="relative">
                      <Input
                        type={showAccessPassword ? "text" : "password"}
                        value={accessPassword}
                        onChange={(e) => setAccessPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-neutral-800 border-neutral-700 text-white pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowAccessPassword(!showAccessPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-white transition-colors"
                        tabIndex={-1}
                      >
                        {showAccessPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-neutral-400">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmAccessPassword ? "text" : "password"}
                        value={confirmAccessPassword}
                        onChange={(e) => setConfirmAccessPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-neutral-800 border-neutral-700 text-white pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmAccessPassword(!showConfirmAccessPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-white transition-colors"
                        tabIndex={-1}
                      >
                        {showConfirmAccessPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={accessPasswordLoading} className="bg-white text-black hover:bg-neutral-200 uppercase tracking-widest text-xs font-bold px-8">
                    {accessPasswordLoading ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        {/* --- SECURITY / ADMIN PASSWORD TAB --- */}
        <TabsContent value="security" className="space-y-6 outline-none">
          <form onSubmit={handleUpdateAdminPassword}>
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <Lock className="w-5 h-5 text-neutral-400" /> Update Admin Login Password
                </CardTitle>
                <CardDescription className="text-neutral-500">
                  Change the password used to log in to this administrative dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 max-w-lg">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-neutral-400">Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showCurrentAdminPassword ? "text" : "password"}
                        value={currentAdminPassword}
                        onChange={(e) => setCurrentAdminPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-neutral-800 border-neutral-700 text-white pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentAdminPassword(!showCurrentAdminPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-white transition-colors"
                        tabIndex={-1}
                      >
                        {showCurrentAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-neutral-400">New Password</Label>
                    <div className="relative">
                      <Input
                        type={showNewAdminPassword ? "text" : "password"}
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-neutral-800 border-neutral-700 text-white pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewAdminPassword(!showNewAdminPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-white transition-colors"
                        tabIndex={-1}
                      >
                        {showNewAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-neutral-400">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmAdminPassword ? "text" : "password"}
                        value={confirmAdminPassword}
                        onChange={(e) => setConfirmAdminPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-neutral-800 border-neutral-700 text-white pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmAdminPassword(!showConfirmAdminPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-white transition-colors"
                        tabIndex={-1}
                      >
                        {showConfirmAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-neutral-800">
                  <Button type="submit" disabled={adminPasswordLoading} className="bg-white text-black hover:bg-neutral-200 uppercase tracking-widest text-xs font-bold px-8">
                    {adminPasswordLoading ? "Updating..." : "Update Admin Password"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
