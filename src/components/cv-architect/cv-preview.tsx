"use client";

import type { CvData } from "@/lib/cv-schema";
import Image from "next/image";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Sparkles, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type CvPreviewProps = {
  cvData: CvData;
  profilePictureUrl: string | null;
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className }) => (
    <section className={cn("mb-6", className)}>
      <h3 className="flex items-center gap-3 text-xl font-bold text-primary mb-4 pb-1 border-b-2 border-primary/20">
        {icon}
        {title}
      </h3>
      <div className="text-sm text-foreground/90">{children}</div>
    </section>
  );

export function CvPreview({ cvData, profilePictureUrl }: CvPreviewProps) {
  const { personalInfo, summary, experience, education, skills } = cvData;

  const personalDetailsContent = (
    <>
      <div className="flex flex-col items-center text-center">
         <div className="relative w-36 h-36 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md mb-4">
           <Image
            src={profilePictureUrl || "https://picsum.photos/200/200"}
            alt={personalInfo.fullName}
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="professional headshot"
          />
        </div>
        <h1 className="text-3xl font-bold text-primary">{personalInfo.fullName}</h1>
        <h2 className="text-lg font-semibold text-primary/80 mt-1">{personalInfo.jobTitle}</h2>
      </div>

      <div className="mt-8">
        <h3 className="flex items-center gap-3 text-lg font-bold text-primary mb-4 pb-1 border-b-2 border-primary/20">
            <User className="w-5 h-5"/>
            Contact
        </h3>
        <div className="flex flex-col gap-3 text-xs">
            <div className="flex items-start gap-3">
                <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <a href={`mailto:${personalInfo.email}`} className="hover:underline break-all">{personalInfo.email}</a>
            </div>
            <div className="flex items-start gap-3">
                <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>{personalInfo.phone}</span>
            </div>
             <div className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>{personalInfo.address}</span>
            </div>
        </div>
      </div>
      
      {skills.length > 0 && (
        <div className="mt-8">
            <h3 className="flex items-center gap-3 text-lg font-bold text-primary mb-4 pb-1 border-b-2 border-primary/20">
                <Sparkles className="w-5 h-5" />
                Compétences
            </h3>
          <div className="flex flex-col gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="text-sm">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="bg-background lg:py-12 lg:px-4">
      <div
        id="cv-preview-container"
        className="w-full max-w-[210mm] min-h-[297mm] bg-card text-card-foreground shadow-lg mx-auto flex font-body"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <aside className="w-1/3 bg-primary/5 p-8 flex-col text-sm text-foreground/80">
          {personalDetailsContent}
        </aside>

        <main className="w-2/3 p-10 bg-card">
           <Section title="Résumé" icon={<FileText className="w-5 h-5" />}>
             <p className="leading-relaxed text-justify">{summary}</p>
          </Section>

          {experience.length > 0 && (
            <Section title="Expérience Professionnelle" icon={<Briefcase className="w-5 h-5" />}>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-base">{exp.jobTitle}</h4>
                      <p className="text-xs font-medium text-foreground/60">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="font-semibold text-primary/90 text-sm mb-1">{exp.company}</p>
                    <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {education.length > 0 && (
            <Section title="Formation" icon={<GraduationCap className="w-5 h-5" />}>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-base">{edu.degree}</h4>
                      <p className="text-xs font-medium text-foreground/60">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    <p className="font-semibold text-primary/90 text-sm">{edu.school}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </main>
      </div>
    </div>
  );
}
