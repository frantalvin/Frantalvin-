"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvSchema, defaultCvData, type CvData } from "@/lib/cv-schema";
import { CvEditor } from "@/components/cv-architect/cv-editor";
import { CvPreview } from "@/components/cv-architect/cv-preview";
import { CvHeader } from "@/components/cv-architect/header";

export function CVArchitectApp() {
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);

  const form = useForm<CvData>({
    resolver: zodResolver(cvSchema),
    defaultValues: defaultCvData,
    mode: "onBlur",
  });

  const cvData = form.watch();
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newUrl = URL.createObjectURL(file);
      
      if (profilePictureUrl) {
        URL.revokeObjectURL(profilePictureUrl);
      }
      setProfilePictureUrl(newUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (profilePictureUrl) {
        URL.revokeObjectURL(profilePictureUrl);
      }
    };
  }, [profilePictureUrl]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <CvHeader />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 lg:overflow-hidden">
        <div className="no-print bg-card lg:border-r h-full overflow-y-auto">
          <CvEditor form={form} onImageUpload={handleImageUpload} />
        </div>
        <div className="w-full h-full overflow-y-auto bg-muted/50 pb-12">
          <CvPreview cvData={cvData} profilePictureUrl={profilePictureUrl} />
        </div>
      </main>
    </div>
  );
}
