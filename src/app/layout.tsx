import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "CV Architecte",
  description:
    "Créez un CV professionnel et moderne en quelques minutes. Personnalisez, optimisez avec l'IA et exportez en PDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Calibri:wght@400;700&family=Segoe+UI:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "h-full font-body antialiased",
          "bg-background text-foreground"
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
