'use client';

import { useState } from 'react';
import {
  BookOpen, Camera, Upload, Eye, Sparkles, Users, ImageIcon,
  LayoutDashboard, FileText, MessageSquare, Bot, Layers, Settings,
  ChevronRight, Search, Info, AlertTriangle, CheckCircle2, Monitor,
  Palette, HelpCircle, Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

/* ─────────────────── HELPER COMPONENTS ─────────────────── */

function InfoTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800 my-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-neutral-900/80 border-b border-neutral-800">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-neutral-500 font-bold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/60">
          {rows.map((row, i) => (
            <tr key={i} className={cn("hover:bg-white/5 transition-colors", i % 2 === 0 ? "" : "bg-neutral-900/20")}>
              {row.map((cell, j) => (
                <td key={j} className={cn("px-4 py-3 text-neutral-300", j === 0 && "font-medium text-white")}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 my-4 bg-violet-500/5 border border-violet-500/20 rounded-xl">
      <Info className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-neutral-300 leading-relaxed">{children}</div>
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 my-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
      <div className="text-sm text-neutral-300 leading-relaxed">{children}</div>
    </div>
  );
}

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-2 my-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span className="flex-shrink-0 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
            {i + 1}
          </span>
          <span className="text-sm text-neutral-300 leading-relaxed pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-1">
      <div className="p-2 rounded-lg bg-neutral-800/50 border border-neutral-700/50">
        <Icon className="w-4 h-4 text-neutral-400" />
      </div>
      <span className="text-base font-medium text-white">{title}</span>
    </div>
  );
}

/* ─────────────────── MAIN PAGE ─────────────────── */

export default function AdminHelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1 bg-emerald-500 rounded-full" />
            <h1 className="text-3xl font-serif font-light tracking-tight text-white">Help & Guide</h1>
          </div>
          <p className="text-neutral-500 text-sm max-w-xl">
            Complete operational manual for the WhoKnows Models admin dashboard.
            Everything you need to manage talent, campaigns, content, and more.
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
          <Input
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 w-72 bg-neutral-900/50 border-neutral-800 text-xs placeholder:text-neutral-600 focus-visible:ring-emerald-500/40"
          />
        </div>
      </div>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Users, title: 'Add a Model', desc: 'Upload portfolio, set roles, and publish.', tab: 'models', color: 'text-blue-400' },
          { icon: Camera, title: 'Photo Specs', desc: 'Dimensions, formats, and file sizes.', tab: 'photos', color: 'text-pink-400' },
          { icon: Sparkles, title: 'Blog & SEO', desc: 'Generate articles with Oracle AI.', tab: 'content', color: 'text-violet-400' },
        ].map((card) => (
          <Card key={card.title} className="bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 transition-colors group cursor-pointer">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50 group-hover:border-neutral-600 transition-colors">
                <card.icon className={cn("w-5 h-5", card.color)} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-1">{card.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{card.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-neutral-900 border border-neutral-800 mb-6 flex-wrap h-auto gap-1 p-1">
          {[
            { value: 'overview', label: 'Overview', icon: Monitor },
            { value: 'models', label: 'Models', icon: Users },
            { value: 'photos', label: 'Photo Specs', icon: Camera },
            { value: 'content', label: 'Content & AI', icon: Sparkles },
            { value: 'system', label: 'System', icon: Settings },
          ].map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="capitalize text-xs tracking-widest gap-1.5 data-[state=active]:bg-white data-[state=active]:text-black px-4 py-2">
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ═══════════════ TAB: OVERVIEW ═══════════════ */}
        <TabsContent value="overview">
          <div className="space-y-6">
            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardHeader className="border-b border-neutral-800 pb-4">
                <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-neutral-400" /> Dashboard Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  The main dashboard (<code className="text-emerald-400 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">/admin</code>) is your command center.
                  It shows real-time stats, recent activity, quick actions, and system health.
                </p>

                <Accordion type="multiple" className="border-neutral-800">
                  <AccordionItem value="stats" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={LayoutDashboard} title="Stats Cards" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <InfoTable
                        headers={['Card', 'Description', 'Color']}
                        rows={[
                          ['Men Models', 'Total male models in the roster + monthly trend.', '🔵 Blue'],
                          ['Women Models', 'Total female models in the roster + monthly trend.', '🩷 Pink'],
                          ['Live Campaigns', 'Active campaign/job showcases.', '🟡 Amber'],
                          ['Pending Applications', 'Unprocessed talent submissions from /apply.', '🟢 Emerald'],
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="quick" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Zap} title="Quick Actions" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <InfoTable
                        headers={['Button', 'Action']}
                        rows={[
                          ['Add New Model', 'Create a new talent profile.'],
                          ['Create Campaign', 'Set up a new job/campaign showcase.'],
                          ['Update Page Content', 'Edit text content across public pages.'],
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="api" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Monitor} title="API Heartbeat Monitor" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-400 mb-3">Displays real-time status for all services:</p>
                      <InfoTable
                        headers={['Service', 'Status Indicators']}
                        rows={[
                          ['Supabase Database', 'CONNECTED (green) or ERROR (red) + latency.'],
                          ['Gemini AI Engine', 'CONNECTED (green) or ERROR (red) + latency.'],
                          ['Formspree API', 'CONNECTED (green) or ERROR (red) + latency.'],
                          ['Cloudflare Edge', 'STABLE (green) or ERROR (red) + latency.'],
                        ]}
                      />
                      <Tip>Click the 🔄 Refresh button to re-check all services manually.</Tip>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Applications & Contacts */}
            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardHeader className="border-b border-neutral-800 pb-4">
                <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-neutral-400" /> Applications & Contact Messages
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="multiple" className="border-neutral-800">
                  <AccordionItem value="apps" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={FileText} title="Applications Panel (/admin/applications)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-400 mb-3">
                        Displays talent submissions from the public <code className="text-emerald-400 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">/apply</code> page.
                      </p>
                      <InfoTable
                        headers={['Field', 'Description']}
                        rows={[
                          ['Name', 'Full name of the applicant.'],
                          ['Email', 'Email address provided.'],
                          ['Location', 'City and country (e.g., "Bali, Indonesia").'],
                          ['Status', 'Processing status: pending, reviewed, accepted.'],
                          ['Height', 'Physical height measurement.'],
                          ['Photo Grid', 'Up to 3 preview photos (aspect 3:4).'],
                          ['🗑️ Delete', 'Permanent deletion. Removes all associated photos.'],
                        ]}
                      />
                      <Tip>Applications are loaded in batches of 20. Click "Load More" for the next batch.</Tip>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="contacts" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={MessageSquare} title="Contact Messages (/admin/contacts)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-400 mb-3">
                        Inquiries from the public <code className="text-emerald-400 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">/contact</code> page.
                      </p>
                      <InfoTable
                        headers={['Action', 'Description']}
                        rows={[
                          ['Reply', 'Opens your default email client (mailto:) with the sender\'s email.'],
                          ['🗑️ Delete', 'Permanently deletes the message. Cannot be undone.'],
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ═══════════════ TAB: MODELS ═══════════════ */}
        <TabsContent value="models">
          <div className="space-y-6">
            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardHeader className="border-b border-neutral-800 pb-4">
                <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-neutral-400" /> Models Management (Men / Women)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="multiple" className="border-neutral-800">
                  <AccordionItem value="grid" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Users} title="Models Grid View" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-400 mb-3">
                        Routes: <code className="text-emerald-400 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">/admin/models/men</code> and <code className="text-emerald-400 bg-neutral-800 px-1.5 py-0.5 rounded text-xs">/admin/models/women</code>
                      </p>
                      <InfoTable
                        headers={['Action (Hover)', 'Description']}
                        rows={[
                          ['✏️ Edit', 'Open the model edit form.'],
                          ['🔗 View Live', 'Open the public portfolio page in a new tab.'],
                          ['🗑️ Delete', 'Permanently delete the model and all images.'],
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="form" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={FileText} title="Model Form (Create / Edit)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mt-2 mb-3">Section A — Profile Information</h4>
                      <InfoTable
                        headers={['Field', 'Type', 'Description']}
                        rows={[
                          ['Full Name', 'Text (required)', 'Display name. A URL slug is auto-generated.'],
                          ['Location', 'Text', 'City (e.g., "Bali", "London").'],
                          ['Biography', 'Textarea', 'Multi-line biography text.'],
                          ['Featured Talent', 'Toggle', 'Show in "Featured" section on frontend.'],
                        ]}
                      />

                      <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mt-6 mb-3">Section B — Physical Attributes</h4>
                      <InfoTable
                        headers={['Field', 'Example']}
                        rows={[
                          ['Height', '5\'10"'],
                          ['Chest/Bust', '32'],
                          ['Waist', '24'],
                          ['Hips', '34'],
                          ['Hair', 'Brown'],
                          ['Eyes', 'Blue'],
                        ]}
                      />

                      <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mt-6 mb-3">Section C — Portfolio Images</h4>
                      <p className="text-sm text-neutral-400 mb-3">
                        Upload portfolio images in the right column. Click the dashed area to select files (multiple files allowed).
                        Images are automatically optimized to WebP format.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="roles" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Eye} title="Image Visibility Roles" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-400 mb-3">
                        Hover over any portfolio image on the model edit page to reveal role controls.
                        These roles determine where the image appears on the public website.
                      </p>

                      <InfoTable
                        headers={['Role', 'Where It Appears', 'Max Count']}
                        rows={[
                          ['✅ Primary', 'Roster grid cards (/women, /men, /archives)', '1 per model'],
                          ['👤 Face', 'Homepage FACES carousel (circular headshots)', 'Multiple allowed'],
                          ['🔵 Prime-All', 'Homepage hero/prime area (all genders)', '1 system-wide'],
                          ['🩷 Prime-W', 'Homepage Women section cover', '1 system-wide'],
                          ['🟣 Prime-M', 'Homepage Men section cover', '1 system-wide'],
                        ]}
                      />

                      <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mt-6 mb-3">Badge Colors on Images</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white text-xs border-none">Primary</Badge>
                        <Badge className="bg-white text-black hover:bg-white text-xs border-none">Face</Badge>
                        <Badge className="bg-blue-500 hover:bg-blue-500 text-white text-xs border-none">All</Badge>
                        <Badge className="bg-pink-500 hover:bg-pink-500 text-white text-xs border-none">W-Prime</Badge>
                        <Badge className="bg-indigo-500 hover:bg-indigo-500 text-white text-xs border-none">M-Prime</Badge>
                      </div>

                      <Warning>
                        <strong>Prime roles are exclusive.</strong> Assigning Prime-All to a new image automatically removes it from the previous holder.
                        Only ONE image can hold each Prime role at a time.
                      </Warning>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="workflow" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={CheckCircle2} title="Complete Workflow: Adding a New Model" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <StepList steps={[
                        'Navigate to Models (Women) or Models (Men).',
                        'Click "+ Add Model".',
                        'Fill in: Name, Location, Biography, and Physical Attributes.',
                        'Toggle "Featured Talent" if this model should appear on homepage.',
                        'Upload portfolio images (3:4 ratio, WebP preferred, under 500 KB each).',
                        'Click "Create Model".',
                        'Return to the model list → click ✏️ Edit on the new model.',
                        'Hover over each image to assign roles: set Primary, Face, and Prime roles.',
                        'Click "Save Changes".',
                      ]} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Campaigns & Brand Partners */}
            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardHeader className="border-b border-neutral-800 pb-4">
                <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-neutral-400" /> Campaigns & Brand Partners
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="multiple" className="border-neutral-800">
                  <AccordionItem value="campaigns" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={ImageIcon} title="Campaigns / Jobs (/admin/campaigns)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-400 mb-3">
                        Manages editorial, commercial, and fashion campaign showcases for the /jobs page.
                      </p>
                      <InfoTable
                        headers={['Field', 'Description']}
                        rows={[
                          ['Job Title', 'Required. Campaign name (e.g., "Summer 2026 Editorial").'],
                          ['Client', 'Brand or client name (e.g., "Dior").'],
                          ['Year', 'Campaign year (e.g., "2026").'],
                          ['Description', 'Free-text description.'],
                          ['Visible on Website', 'Toggle → show on the public /jobs page.'],
                          ['Featured on Home', 'Toggle → show in Landing Page Featured section.'],
                          ['Cover Asset', 'Upload image or video (3:4). Hover to upload.'],
                          ['Tag Models', 'Click models to tag them to this campaign.'],
                          ['Gallery Assets', '(Create only) Multiple images/videos for the gallery.'],
                        ]}
                      />
                      <Tip>High-res files are auto-transcoded to WebP/WebM by the server.</Tip>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="clients" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Palette} title="Brand Partners (/admin/clients)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-400 mb-3">
                        Manages logos in the "Trusted by Leading Brands" homepage section.
                      </p>
                      <InfoTable
                        headers={['Field', 'Description']}
                        rows={[
                          ['Brand Name', 'Required. Company name (e.g., "Nike").'],
                          ['Display Order', 'Number controlling position. Lower = earlier.'],
                          ['Visible on Website', 'Toggle → show on the landing page.'],
                          ['Brand Logo', 'SVG or Transparent PNG preferred. 400×200px.'],
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ═══════════════ TAB: PHOTO SPECS ═══════════════ */}
        <TabsContent value="photos">
          <div className="space-y-6">
            <Warning>
              <strong>Following these specifications is critical</strong> to maintain the "Instant Loading" performance of WhoKnows Models.
              Always compress images before uploading.
            </Warning>

            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardHeader className="border-b border-neutral-800 pb-4">
                <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-neutral-400" /> Photo Upload Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="multiple" defaultValue={['portfolio', 'faces', 'hero', 'campaign', 'logo']} className="border-neutral-800">
                  <AccordionItem value="portfolio" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Users} title="Portfolio / Profile Images (Roster Grid)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <InfoTable
                        headers={['Property', 'Specification']}
                        rows={[
                          ['Aspect Ratio', '3:4 (Portrait orientation)'],
                          ['Dimensions (Max)', '1200 × 1600 px'],
                          ['Dimensions (Min)', '900 × 1200 px'],
                          ['Format (Best)', 'WebP (auto-converted by server)'],
                          ['Format (Accepted)', 'JPG / JPEG (quality 80%+), PNG (not recommended)'],
                          ['Max File Size', '500 KB per image (optimal: 100–200 KB)'],
                          ['Color Profile', 'sRGB recommended'],
                          ['Background', 'Clean studio or natural environments'],
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="faces" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Eye} title="Faces Carousel (Homepage Headshots)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <InfoTable
                        headers={['Property', 'Specification']}
                        rows={[
                          ['Aspect Ratio', '1:1 (Square — circular crop auto-applied)'],
                          ['Dimensions', '600 × 600 px'],
                          ['Framing', 'Tight headshot — face fills 70-80% of frame'],
                          ['Max File Size', '200 KB per image'],
                        ]}
                      />
                      <Tip>The circular mask will crop to center. Make sure the face is perfectly centered in the frame.</Tip>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="hero" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Monitor} title="Hero Slide Images (Full-width Banners)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <InfoTable
                        headers={['Property', 'Specification']}
                        rows={[
                          ['Aspect Ratio', '16:9 (Landscape, cinematic)'],
                          ['Dimensions', '1920 × 1080 px'],
                          ['Format', 'WebP or high-quality JPEG'],
                          ['Max File Size', '800 KB (optimal: 300–500 KB)'],
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="campaign" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={ImageIcon} title="Campaign Cover Assets" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <InfoTable
                        headers={['Property', 'Specification']}
                        rows={[
                          ['Aspect Ratio', '3:4 (Portrait, same as portfolio)'],
                          ['Dimensions', '1200 × 1600 px'],
                          ['Video Support', '.mp4 or .webm — auto-loops silently'],
                          ['Max Size (Image)', '500 KB'],
                          ['Max Size (Video)', '5 MB recommended'],
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="logo" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Palette} title="Brand Partner Logos" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <InfoTable
                        headers={['Property', 'Specification']}
                        rows={[
                          ['Aspect Ratio', '16:9 (Landscape container)'],
                          ['Format (Best)', 'SVG or Transparent PNG'],
                          ['Dimensions', '400 × 200 px'],
                          ['Background', 'Transparent required (dark background display)'],
                          ['Max File Size', '100 KB'],
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Compression Tools */}
            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardHeader className="border-b border-neutral-800 pb-4">
                <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
                  <Upload className="w-5 h-5 text-neutral-400" /> Recommended Compression Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <InfoTable
                  headers={['Tool', 'URL', 'Best For']}
                  rows={[
                    ['Squoosh', 'squoosh.app', 'Browser-based WebP conversion (by Google).'],
                    ['TinyPNG', 'tinypng.com', 'Batch PNG/JPEG compression.'],
                    ['Photoshop', '—', 'Use "Export As" → WebP at 80% quality.'],
                    ['Figma', '—', 'Export at 2x with WebP for retina-ready.'],
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ═══════════════ TAB: CONTENT & AI ═══════════════ */}
        <TabsContent value="content">
          <div className="space-y-6">
            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardHeader className="border-b border-neutral-800 pb-4">
                <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-neutral-400" /> Content & AI Engines
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="multiple" className="border-neutral-800">
                  <AccordionItem value="blog" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Sparkles} title="Blog Engine (/admin/blog)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-400 mb-3">
                        Oracle-powered programmatic SEO content pipeline.
                      </p>
                      <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mt-4 mb-3">Header Actions</h4>
                      <InfoTable
                        headers={['Button', 'Description']}
                        rows={[
                          ['🔄 Refresh', 'Reload article list from database.'],
                          ['+ Create Manual', 'Create a blank draft with custom title.'],
                          ['✨ Generate with Oracle', 'AI generates an SEO-optimized article as DRAFT.'],
                        ]}
                      />
                      <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mt-6 mb-3">Full-Screen Editor</h4>
                      <InfoTable
                        headers={['Element', 'Description']}
                        rows={[
                          ['Title Input', 'Editable article title.'],
                          ['Target Keyword', 'SEO keyword (set during generation).'],
                          ['Edit / Preview', 'Toggle raw Markdown vs. rendered HTML.'],
                          ['SEO Sidebar', 'Meta Title, Description, Keyword, OG info.'],
                          ['Save Draft', 'Save without publishing.'],
                          ['Publish', 'Save and make article live.'],
                        ]}
                      />

                      <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mt-6 mb-3">Workflow: AI-Generated Article</h4>
                      <StepList steps={[
                        'Click "✨ Generate with Oracle" → Oracle creates a DRAFT.',
                        'Click ✏️ Edit on the new draft.',
                        'Review content and SEO metadata sidebar.',
                        'Toggle Preview to verify rendered output.',
                        'Make edits as needed.',
                        'Click "Publish" when satisfied.',
                      ]} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cluster" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Layers} title="Cluster Engine (/admin/services)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-400 mb-3">
                        Programmatic SEO landing pages targeting industrial niches
                        (e.g., "Fashion Photography Bali", "Model Casting Indonesia").
                      </p>
                      <InfoTable
                        headers={['Column', 'Description']}
                        rows={[
                          ['Landing Page', 'Page title + full URL path.'],
                          ['Category Cluster', 'Parent category (e.g., "fashion-photography").'],
                          ['Status', 'PUBLISHED (green) or DRAFT (amber).'],
                          ['Generated', 'Date the page was created.'],
                          ['Actions', 'View live page + Settings.'],
                        ]}
                      />
                      <Tip>Use the search filter to find pages by title or category name.</Tip>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="ai" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Bot} title="WK_Ai Assistant (/admin/ai)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-400 mb-3">
                        AI-powered COO assistant backed by the Gemini Engine.
                      </p>
                      <InfoTable
                        headers={['Feature', 'Description']}
                        rows={[
                          ['Chat Window', 'Real-time conversation. Press Enter to send.'],
                          ['Markdown Support', 'AI responses render bold, lists, code blocks.'],
                          ['Audit Vault', 'Read-only log of ALL AI interactions (permanent).'],
                        ]}
                      />
                      <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mt-4 mb-3">Example Prompts</h4>
                      <div className="space-y-2">
                        {[
                          '"How many new applications came in this week?"',
                          '"Summarize the current talent roster stats."',
                          '"What campaigns are currently active?"',
                        ].map((prompt, i) => (
                          <div key={i} className="px-4 py-2.5 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-sm text-neutral-300 italic">
                            {prompt}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="page-content" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={FileText} title="Page Content Manager (/admin/content)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-400 mb-3">
                        Edit text content (titles, subtitles, descriptions) on public pages without code.
                      </p>
                      <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-3">Available Page Tabs</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {['Home', 'Women', 'Men', 'Contact', 'Apply'].map((p) => (
                          <Badge key={p} variant="outline" className="text-xs text-neutral-400 border-neutral-700">{p}</Badge>
                        ))}
                      </div>
                      <InfoTable
                        headers={['Section', 'Fields']}
                        rows={[
                          ['Hero Section', 'Hero Title (input) + Hero Subtitle (textarea).'],
                          ['Introduction Section', 'Section Heading (input) + Section Content (textarea).'],
                        ]}
                      />
                      <StepList steps={[
                        'Select the page tab (e.g., "Home").',
                        'Edit the text fields.',
                        'Click "Save Changes" (sticky button at bottom-right).',
                        'The public page is automatically updated.',
                      ]} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ═══════════════ TAB: SYSTEM ═══════════════ */}
        <TabsContent value="system">
          <div className="space-y-6">
            <Card className="bg-neutral-900/50 border-neutral-800">
              <CardHeader className="border-b border-neutral-800 pb-4">
                <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-neutral-400" /> System & Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="multiple" className="border-neutral-800">
                  <AccordionItem value="hero-slides" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Monitor} title="Hero Slides Manager (/admin/hero)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-400 mb-3">
                        Manages full-width cinematic slides on the homepage.
                      </p>
                      <InfoTable
                        headers={['Field', 'Description']}
                        rows={[
                          ['Title (Optional)', 'Overlay text on the slide.'],
                          ['Subtitle (Optional)', 'Secondary text below title.'],
                          ['Link URL', 'Where clicking navigates (e.g., /models/women).'],
                          ['Slide Image', 'Upload 1920×1080px WebP recommended.'],
                          ['Active Slide', 'Toggle — when OFF, slide is hidden.'],
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="logs" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={Settings} title="Activity Logs (/admin/logs)" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-neutral-400 mb-3">
                        Comprehensive audit trail of every admin action.
                      </p>
                      <InfoTable
                        headers={['Column', 'Description']}
                        rows={[
                          ['Time', 'Date + exact timestamp (HH:mm:ss).'],
                          ['Admin', 'Email of the admin who performed the action.'],
                          ['Action', 'create (🟢), update (🔵), or delete (🔴).'],
                          ['Entity', 'Type affected: model, campaign, blog, etc.'],
                          ['Details', 'Human-readable description of the change.'],
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sidebar" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={LayoutDashboard} title="Sidebar Navigation Reference" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <InfoTable
                        headers={['Menu Item', 'Route', 'Description']}
                        rows={[
                          ['Dashboard', '/admin', 'Overview with stats, activity, API health.'],
                          ['Applications', '/admin/applications', 'Review talent submissions.'],
                          ['Contact Messages', '/admin/contacts', 'Read and reply to inquiries.'],
                          ['Models (Men)', '/admin/models/men', 'Manage male model roster.'],
                          ['Models (Women)', '/admin/models/women', 'Manage female model roster.'],
                          ['Campaigns', '/admin/campaigns', 'Campaign/job showcases.'],
                          ['Brand Partners', '/admin/clients', 'Brand logos management.'],
                          ['WK_Ai Assistant', '/admin/ai', 'AI COO chat + audit logs.'],
                          ['Blog Engine', '/admin/blog', 'Oracle-powered SEO blog.'],
                          ['Cluster Engine', '/admin/services', 'Programmatic SEO pages.'],
                          ['Activity Logs', '/admin/logs', 'Full audit trail.'],
                          ['Help & Guide', '/admin/help', 'This page!'],
                        ]}
                      />

                      <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-bold mt-6 mb-3">Sidebar Features</h4>
                      <InfoTable
                        headers={['Feature', 'How to Use']}
                        rows={[
                          ['Collapse/Expand', 'Click the panel icon to toggle full (272px) or compact (80px) sidebar.'],
                          ['View Website', 'Opens the public homepage in a new tab.'],
                          ['Sign Out', 'Logs out and redirects to homepage.'],
                          ['Mobile Menu', 'On mobile, tap the ☰ hamburger icon to open the sidebar.'],
                        ]}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="login" className="border-neutral-800">
                    <AccordionTrigger className="text-white hover:no-underline">
                      <SectionTitle icon={HelpCircle} title="Login & Authentication" />
                    </AccordionTrigger>
                    <AccordionContent>
                      <InfoTable
                        headers={['Element', 'Description']}
                        rows={[
                          ['Email Address', 'Enter admin email (whoknowsmodeling@gmail.com).'],
                          ['Password', 'Enter password. Use Show/Hide toggle.'],
                          ['Login to Dashboard', 'Submit → redirects to /admin on success.'],
                          ['Back to Website', 'Returns to the public homepage.'],
                        ]}
                      />
                      <Tip>
                        Invalid credentials show a red toast. Successful login shows green toast: "Welcome back, Admin".
                      </Tip>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-center py-8 opacity-40">
        <p className="text-[10px] text-neutral-500 uppercase tracking-[0.3em]">
          WhoKnows Models Admin Guide v37.0.0
        </p>
      </div>
    </div>
  );
}
