"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/cv-architect/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";

export function CvHeader() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const cvElement = document.getElementById("cv-preview-container");
    if (!cvElement) {
      console.error("CV preview element not found");
      return;
    }
    
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(cvElement, {
        scale: 2, // Augmente la résolution pour une meilleure qualité
        useCORS: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("cv-architecte.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
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
          <Button onClick={handleDownload} disabled={isDownloading}>
            {isDownloading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            {isDownloading ? "Téléchargement..." : "Télécharger en PDF"}
          </Button>
        </div>
      </div>
    </header>
  );
}
