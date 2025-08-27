"use client";
import { FormProvider, useForm } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PersonalDetailsForm } from "./editor/personal-details-form";
import { SummaryForm } from "./editor/summary-form";
import { ExperienceForm } from "./editor/experience-form";
import { EducationForm } from "./editor/education-form";
import { SkillsForm } from "./editor/skills-form";
import { User, Briefcase, GraduationCap, Sparkles as BrainCircuit, FileText } from "lucide-react";

type CvEditorProps = {
  form: ReturnType<typeof useForm>;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const sections = [
  {
    value: "personal",
    title: "Informations Personnelles",
    Icon: User,
    Component: PersonalDetailsForm,
  },
  {
    value: "summary",
    title: "Résumé",
    Icon: FileText,
    Component: SummaryForm,
  },
  {
    value: "experience",
    title: "Expérience Professionnelle",
    Icon: Briefcase,
    Component: ExperienceForm,
  },
  {
    value: "education",
    title: "Formation",
    Icon: GraduationCap,
    Component: EducationForm,
  },
  {
    value: "skills",
    title: "Compétences",
    Icon: BrainCircuit,
    Component: SkillsForm,
  },
];

export function CvEditor({ form, onImageUpload }: CvEditorProps) {
  return (
    <FormProvider {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="h-full overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
             <h2 className="text-2xl font-bold tracking-tight">Éditeur de CV</h2>
             <p className="text-muted-foreground">Remplissez les sections pour construire votre CV.</p>
          </div>
          <Accordion type="multiple" defaultValue={["personal", "summary", "experience", "education", "skills"]} className="w-full">
            {sections.map(({ value, title, Icon, Component }) => (
              <AccordionItem value={value} key={value}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    {title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <Component onImageUpload={onImageUpload} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </form>
    </FormProvider>
  );
}
