"use client";

import type { CvData } from "@/lib/cv-schema";
import Image from "next/image";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Sparkles, User, FileText, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type CvPreviewProps = {
  cvData: CvData;
  profilePictureUrl: string | null;
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className }) => (
    <section className={cn("mb-6 print-section", className)}>
      <h3 className="flex items-center gap-3 text-sm font-bold uppercase text-primary mb-4 pb-1 border-b-2 border-primary/20">
        {icon}
        {title}
      </h3>
      <div className="text-[10pt] text-foreground/90">{children}</div>
    </section>
  );

const PersonalDetailsContent: React.FC<{ personalInfo: CvData['personalInfo'], profilePictureUrl: string | null, skills: CvData['skills'], interests: CvData['interests'], forPrint?: boolean }> = ({ personalInfo, profilePictureUrl, skills, interests, forPrint = false }) => (
  <>
    <div className={cn("flex flex-col text-center", forPrint ? "items-start text-left" : "items-center")}>
      {forPrint && (
        <h1 className="text-xl font-bold text-primary">{personalInfo.fullName}</h1>
      )}
      {!forPrint && (
        <>
          <div className="relative w-28 h-28 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md mb-4">
            <Image
              src={profilePictureUrl || "https://picsum.photos/200/200"}
              alt={personalInfo.fullName}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint="professional headshot"
            />
          </div>
          <h1 className="text-xl font-bold text-primary">{personalInfo.fullName}</h1>
        </>
      )}
      <h2 className="text-base font-bold text-primary/80 mt-1">{personalInfo.jobTitle}</h2>
    </div>

    <div className={forPrint ? "mt-4" : "mt-8"}>
      <h3 className={cn("flex items-center gap-3 text-sm font-bold text-primary mb-4 pb-1 border-b-2 border-primary/20", forPrint ? "uppercase" : "")}>
          <User className="w-4 h-4"/>
          Contact
      </h3>
      <div className="flex flex-col gap-3 text-[10pt]">
          <div className="flex items-start gap-3">
              <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <a href={`mailto:${personalInfo.email}`} className="hover:underline break-words">{personalInfo.email}</a>
          </div>
          <div className="flex items-start gap-3">
              <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span className="break-words">{personalInfo.phone}</span>
          </div>
           <div className="flex items-start gap-3">
              <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span className="break-words">{personalInfo.address}</span>
          </div>
      </div>
    </div>
    
    {skills.length > 0 && (
      <div className={forPrint ? "mt-4" : "mt-8"}>
          <h3 className="flex items-center gap-3 text-sm font-bold uppercase text-primary mb-4 pb-1 border-b-2 border-primary/20">
              <Sparkles className="w-4 h-4" />
              Compétences
          </h3>
        <div className="flex flex-col gap-2">
          {skills.map((skill) => (
            <span key={skill.id} className="text-[10pt] break-words">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    )}

    {interests.length > 0 && (
      <div className={forPrint ? "mt-4" : "mt-8"}>
          <h3 className="flex items-center gap-3 text-sm font-bold uppercase text-primary mb-4 pb-1 border-b-2 border-primary/20">
              <Heart className="w-4 h-4" />
              Centres d'intérêt
          </h3>
        <div className="flex flex-col gap-2">
          {interests.map((interest) => (
            <span key={interest.id} className="text-[10pt] break-words">
              {interest.name}
            </span>
          ))}
        </div>
      </div>
    )}
  </>
);


export function CvPreview({ cvData, profilePictureUrl }: CvPreviewProps) {
  const { personalInfo, summary, experience, education, skills, interests } = cvData;

  return (
    <div
      id="cv-preview-container"
      className="w-[210mm] min-h-[297mm] bg-card text-card-foreground shadow-lg mx-auto my-12 flex font-body"
      style={{ fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* --- Screen Only Version --- */}
      <aside className="w-1/3 bg-primary/5 p-6 flex-col text-sm text-foreground/80 print-aside-col">
         <PersonalDetailsContent personalInfo={personalInfo} profilePictureUrl={profilePictureUrl} skills={skills} interests={interests} />
      </aside>

      {/* --- Main Content --- */}
      <main className="w-2/3 p-8 bg-card print-main-col" style={{ fontFamily: "'Calibri', sans-serif" }}>
         {/* --- Print Only Header --- */}
         <div className="hidden print-header-col">
            <PersonalDetailsContent personalInfo={personalInfo} profilePictureUrl={profilePictureUrl} skills={skills} interests={interests} forPrint />
         </div>

         <Section title="Résumé" icon={<FileText className="w-4 h-4" />}>
           <p className="leading-relaxed text-justify">{summary}</p>
        </Section>

        {experience.length > 0 && (
          <Section title="Expérience Professionnelle" icon={<Briefcase className="w-4 h-4" />}>
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-base">{exp.jobTitle}</h4>
                    <p className="text-xs font-medium text-foreground/60">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="font-semibold text-primary/90 text-sm mb-1">{exp.company}</p>
                  <p className="text-foreground/80 text-[10pt] leading-relaxed whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Formation" icon={<GraduationCap className="w-4 h-4" />}>
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
  );
}
