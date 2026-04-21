import type { Metadata } from "next";
import { Bricolage_Grotesque, Onest, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
});

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: false,
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yaigenes.infrabio.dev"),
  title: "Yaiser Avila Rodríguez — Site Reliability Engineer",
  description:
    "SRE with 5+ years of experience in multi-cloud Kubernetes at scale, GitOps, cost optimisation, and infrastructure automation. Currently at Hydrolix managing 234+ clusters across AWS, GCP, and Linode.",
  openGraph: {
    title: "Yaiser Avila Rodríguez — Site Reliability Engineer",
    description:
      "SRE specialising in GitOps, Kubernetes at scale, and infrastructure automation. -25.9% compute cost reduction via VPA, 234+ clusters under ArgoCD.",
    url: "https://yaigenes.infrabio.dev",
    siteName: "Yaiser Avila Rodríguez",
    images: [
      {
        url: "/profiol3.png",
        width: 1200,
        height: 630,
        alt: "Yaiser Avila Rodríguez — Site Reliability Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yaiser Avila Rodríguez — Site Reliability Engineer",
    description:
      "SRE specialising in GitOps, Kubernetes at scale, and infrastructure automation.",
    images: ["/profiol3.png"],
  },
  keywords: [
    "Site Reliability Engineer",
    "SRE",
    "Kubernetes",
    "ArgoCD",
    "GitOps",
    "DevOps",
    "Terraform",
    "Prometheus",
    "Grafana",
    "AWS",
    "GCP",
    "Hydrolix",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${onest.variable} ${jetbrains.variable} font-body bg-[#030014] overflow-y-scroll`}
      >
        <LanguageProvider>
          <div className="overflow-x-hidden">
            <StarsCanvas />
            <Navbar />
            {children}
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
