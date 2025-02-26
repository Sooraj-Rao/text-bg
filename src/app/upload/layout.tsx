import type React from "react";

const portfolioWebsiteUrl = "https://soorajrao.in?ref=text-bg-seo";
const websiteUrl = "https://textbehindphoto.soorajrao.in?ref=text-bg-seo";
const appName = "Text Behind Photo";
const ogImageUrl = "https://textbehindphoto.soorajrao.in/og-image.jpg";

export const metadata = {
  title: `${appName} - Instantly Create Stunning Text Effects Behind Images!`,
  description:
    "Transform your photos in seconds! Add eye-catching text behind images with the fastest and easiest online tool—100% free. Start creating now!",
  keywords: [
    "add text behind image instantly",
    "free text editor for images",
    "create stunning text effects",
    "fastest image text tool",
    "overlay text on photos",
    "text masking effect online",
    "create text behind photos",
    "ultimate text editor for images",
    "best online text tool",
    "quick text overlay generator",
    "AI text editor for images",
    "instant photo text editing",
    "free online text overlay tool",
    "text behind photo generator",
    "rapid text effect creation",
  ].join(", "),
  authors: [{ name: "Sooraj Rao", url: portfolioWebsiteUrl }],
  robots: "index, follow",
  openGraph: {
    title: `${appName} - Instantly Create Stunning Text Effects Behind Images!`,
    description:
      "Need to add text behind your image fast? Use the quickest online tool to create amazing text effects behind photos in seconds—totally free!",
    url: websiteUrl,
    siteName: appName,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Text Behind Image Example",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${appName} - Instantly Create Stunning Text Effects Behind Images!`,
    description:
      "Want to add stunning text behind images in seconds? Try the fastest tool now—completely free!",
    images: [ogImageUrl],
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
