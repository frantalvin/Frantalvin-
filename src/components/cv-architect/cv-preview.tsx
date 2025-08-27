"use client";

import type { CvData } from "@/lib/cv-schema";
import Image from "next/image";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";

type CvPreviewProps = {
  cvData: CvData;
  profilePictureUrl: string | null;
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <section className="mb-6">
    <h3 className="flex items-center gap-3 text-lg font-bold text-primary border-b-2 border-accent mb-3 pb-1">
      {icon}
      {title}
    </h3>
    {children}
  </section>
);

export function CvPreview({ cvData, profilePictureUrl }: CvPreviewProps) {
  const { personalInfo, summary, experience, education, skills } = cvData;

  return (
    <div id="cv-preview-container" className="bg-background lg:py-8 lg:px-4">
      <div
        className="w-full max-w-[210mm] min-h-[297mm] bg-card text-card-foreground shadow-lg mx-auto p-8 lg:p-12 font-body text-sm"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <header className="flex items-center gap-8 mb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden shrink-0 border-4 border-gray-200">
            <Image
              src={profilePictureUrl || "https://picsum.photos/200/200"}
              alt={personalInfo.fullName}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint="professional headshot"
            />
          </div>
          <div className="flex-grow">
            <h1 className="text-4xl font-bold text-primary">{personalInfo.fullName}</h1>
            <h2 className="text-xl font-semibold text-primary/80 mt-1">{personalInfo.jobTitle}</h2>
            <div className="mt-4 flex flex-col gap-2 text-xs text-foreground/80">
                <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{personalInfo.phone}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{personalInfo.address}</span>
                </div>
            </div>
          </div>
        </header>

        <main>
          <section className="mb-6">
            <p className="text-foreground/90 leading-relaxed text-justify">{summary}</p>
          </section>

          {experience.length > 0 && (
            <Section title="Expérience Professionnelle" icon={<Briefcase className="w-5 h-5" />}>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold">{exp.jobTitle}</h4>
                      <p className="text-xs font-medium text-foreground/70">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="font-semibold text-primary/90 text-sm mb-1">{exp.company}</p>
                    <p className="text-foreground/80 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {education.length > 0 && (
            <Section title="Formation" icon={<GraduationCap className="w-5 h-5" />}>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold">{edu.degree}</h4>
                      <p className="text-xs font-medium text-foreground/70">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    <p className="font-semibold text-primary/90 text-sm">{edu.school}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {skills.length > 0 && (
            <Section title="Compétences" icon={<Award className="w-5 h-5" />}>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="bg-accent/30 text-primary font-medium text-xs px-3 py-1 rounded-full">
                    {skill.name}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </main>
      </div>
    </div>
  );
}
