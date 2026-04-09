import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = 'edge';

async function getPageContent(page: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("PageContent")
      .select("*")
      .eq("page", page);
    
    if (error) throw error;
    return data || [];
  } catch {
    return [];
  }
}

export default async function AdminContentPage() {
  const pages = ["home", "women", "men", "contact", "apply"];

  async function updateContent(formData: FormData) {
    "use server";
    const page = formData.get("page") as string;
    const entries = Array.from(formData.entries());
    
    for (const [key, value] of entries) {
      if (key === "page" || key.startsWith("$")) continue;
      
      const [section, contentKey] = key.split(".");
      
      // Upsert using Supabase
      // Note: we need the unique constraint columns to match
      const { error } = await supabaseAdmin
        .from("PageContent")
        .upsert({
          page,
          section,
          key: contentKey,
          value: value as string,
        }, {
          onConflict: 'page,section,key'
        });

      if (error) console.error("Upsert page content error:", error);
    }
    
    revalidatePath("/");
    revalidatePath(`/${page}`);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-medium mb-2">Page Content Manager</h1>
        <p className="text-neutral-500 text-sm">Update titles, descriptions, and taglines across the website.</p>
      </div>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="bg-neutral-900 border border-neutral-800 mb-6">
          {pages.map(page => (
            <TabsTrigger key={page} value={page} className="capitalize text-xs tracking-widest">
              {page}
            </TabsTrigger>
          ))}
        </TabsList>

        {pages.map(page => (
          <TabsContent key={page} value={page}>
            <form action={updateContent}>
              <input type="hidden" name="page" value={page} />
              <div className="grid grid-cols-1 gap-8">
                <Card className="bg-neutral-900 border-neutral-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Hero Section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-wider text-neutral-400">Hero Title</Label>
                      <Input name="hero.title" defaultValue="Discover Excellence" className="bg-neutral-800 border-neutral-700" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-xs uppercase tracking-wider text-neutral-400">Hero Subtitle</Label>
                      <Textarea name="hero.subtitle" defaultValue="International modelling agency representing the finest talent worldwide" className="bg-neutral-800 border-neutral-700 h-24" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-900 border-neutral-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Introduction Section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-wider text-neutral-400">Section Heading</Label>
                      <Input name="intro.title" defaultValue="Where Talent Meets Opportunity" className="bg-neutral-800 border-neutral-700" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-wider text-neutral-400">Section Content</Label>
                      <Textarea name="intro.description" defaultValue="WhoKnows Models is a premier international modelling agency..." className="bg-neutral-800 border-neutral-700 h-32" />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-3 sticky bottom-4 z-10">
                  <Button type="submit" className="bg-white text-black hover:bg-neutral-200 px-8 py-6 uppercase text-xs tracking-widest font-medium">
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
