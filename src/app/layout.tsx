import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://whoknows.design"),
  title: {
    default: "WhoKnows Models | International Modelling Agency",
    template: "%s | WhoKnows Models",
  },
  description:
    "WhoKnows Models is an international modelling agency representing the finest talent worldwide. Discover our roster of exceptional models for fashion, editorial, and commercial work.",
  keywords: [
    "modelling agency",
    "fashion models",
    "model management",
    "fashion industry",
    "editorial models",
    "runway models",
    "commercial models",
    "international models",
    "model booking",
    "fashion talent",
  ],
  authors: [{ name: "WhoKnows Models" }],
  creator: "WhoKnows Models",
  publisher: "WhoKnows Models",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "WhoKnows Models | International Modelling Agency",
    description:
      "Discover exceptional models for fashion, editorial, and commercial work. International modelling agency representing the finest talent worldwide.",
    url: "https://whoknows.design",
    siteName: "WhoKnows Models",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WhoKnows Models - International Modelling Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhoKnows Models | International Modelling Agency",
    description:
      "Discover exceptional models for fashion, editorial, and commercial work.",
    images: ["/og-image.jpg"],
    creator: "@whoknowsmodels",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              generateOrganizationSchema(),
              generateWebsiteSchema(),
            ]),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1" id="main-content">{children}</main>
          <Footer />
        </div>
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
