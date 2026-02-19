import type { Metadata } from "next";
import { PT_Sans, Ubuntu_Sans_Mono } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { Providers } from "@/components/providers";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const ptSans = PT_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-pt-sans",
  display: "swap", // Reduce blocking: mostrar texto con fallback mientras carga la fuente
});

const ubuntuMono = Ubuntu_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Edinson Nuñez More",
  alternateName: "Edi Developer",
  url: "https://edi-developer.dev/",
  image: "https://edi-developer.dev/edi-dev-portada.png?v=2025-optimized",
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "Freelance" },
  description:
    "Ingeniero de software con más de 14 años de experiencia. Especialista en Frontend, IA aplicada, gráficos 3D y arquitectura web moderna.",
  knowsAbout: [
    "Frontend Development",
    "React",
    "TypeScript",
    "Artificial Intelligence",
    "3D Graphics",
    "Web Architecture",
    "Software Engineering",
  ],
  sameAs: ["https://edi-developer.dev/"],
  address: { "@type": "PostalAddress", addressCountry: "PE" },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://edi-developer.dev"),
  title: {
    default:
      "Edi Developer - Innovación que abre oportunidades | Frontend Developer & AI Specialist",
    template: "%s | Edi Developer",
  },
  description:
    "Ingeniero de software con más de 14 años de experiencia. Especialista en Frontend, IA aplicada, gráficos 3D y arquitectura web moderna. Construyo tecnología que transforma realidades.",
  keywords: [
    "desarrollador frontend",
    "ingeniero de software",
    "React",
    "TypeScript",
    "IA",
    "inteligencia artificial",
    "desarrollo web",
    "gráficos 3D",
    "arquitectura de software",
    "consultoría tecnológica",
    "Edinson Nuñez",
    "Edi Developer",
  ],
  authors: [{ name: "Edinson Nuñez More" }],
  creator: "Edinson Nuñez More",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://edi-developer.dev/",
    siteName: "Edi Developer",
    title: "Edi Developer - Innovación que abre oportunidades",
    description:
      "Ingeniero de software con más de 14 años de experiencia. Especialista en Frontend, IA aplicada, gráficos 3D y arquitectura web moderna. La tecnología es magia cuando abre oportunidades.",
    images: [
      {
        url: "https://edi-developer.dev/edi-dev-portada.png?v=2025-optimized",
        width: 1200,
        height: 630,
        alt: "Edi Developer - Portafolio de Edinson Nuñez More",
      },
    ],
    locale: "es_PE",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edi Developer - Innovación que abre oportunidades",
    description:
      "Ingeniero de software con más de 14 años de experiencia. Especialista en Frontend, IA aplicada, gráficos 3D y arquitectura web moderna.",
    images: ["https://edi-developer.dev/edi-dev-portada.png?v=2025-optimized"],
  },
  icons: {
    icon: "/icons/web/favicon.ico",
    shortcut: "/icons/web/favicon.ico",
  },
  alternates: {
    canonical: "https://edi-developer.dev/",
    languages: {
      es: "https://edi-developer.dev/",
      "x-default": "https://edi-developer.dev/",
    },
  },
  other: {
    "theme-color": "#ffffff",
    "geo.region": "PE",
    "application-name": "Edi Developer",
    "apple-mobile-web-app-title": "Edi Developer",
    "apple-mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${ptSans.variable} ${ubuntuMono.variable} font-sans antialiased min-h-screen`}
        suppressHydrationWarning
      >
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
              `}
            </Script>
            <Suspense fallback={null}>
              <GoogleAnalytics />
            </Suspense>
          </>
        )}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
