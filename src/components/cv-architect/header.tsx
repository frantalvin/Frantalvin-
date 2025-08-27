"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/cv-architect/icons";

export function CvHeader() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="no-print bg-card border-b sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Logo className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold text-primary tracking-tight">
              CV Architecte
            </h1>
          </div>
          <Button onClick={handlePrint}>
            <Download className="mr-2 h-4 w-4" />
            Télécharger en PDF
          </Button>
        </div>
      </div>
    </header>
  );
}
