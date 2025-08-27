import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

export const experienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(1, "Le titre du poste est requis"),
  company: z.string().min(1, "L'entreprise est requise"),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string().max(500, "La description est trop longue"),
});

export const academicBackgroundSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, "Le diplôme est requis"),
  school: z.string().min(1, "L'école est requise"),
  startDate: z.string(),
  endDate: z.string(),
});

export const trainingSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Le nom de la formation est requis"),
  organization: z.string().min(1, "L'organisme est requis"),
  year: z.string(),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Le nom de la compétence ne peut pas être vide"),
});

export const interestSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Le nom du centre d'intérêt ne peut pas être vide"),
});

export const cvSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, "Le nom complet est requis"),
    jobTitle: z.string().min(1, "Le titre du poste est requis"),
    email: z.string().email("Adresse e-mail invalide").min(1, "L'e-mail est requis"),
    phone: z.string(),
    address: z.string(),
  }),
  summary: z.string().max(1000, "Le résumé est trop long"),
  experience: z.array(experienceSchema),
  academicBackground: z.array(academicBackgroundSchema),
  trainings: z.array(trainingSchema),
  skills: z.array(skillSchema),
  interests: z.array(interestSchema),
});

export type CvData = z.infer<typeof cvSchema>;

export const defaultCvData: CvData = {
  personalInfo: {
    fullName: "Alexandre Dubois",
    jobTitle: "Développeur Full-Stack",
    email: "alexandre.dubois.dev@email.com",
    phone: "06 12 34 56 78",
    address: "123 Rue de la République, Paris",
  },
  summary: "Développeur full-stack passionné avec 5 ans d'expérience dans la création d'applications web robustes et évolutives. Compétent en React, Node.js et TypeScript, je suis à la recherche d'un nouveau défi pour mettre à profit mes compétences techniques et ma créativité au sein d'une équipe innovante.",
  experience: [
    {
      id: uuidv4(),
      jobTitle: "Développeur Senior",
      company: "Tech Solutions Inc.",
      startDate: "2021",
      endDate: "Présent",
      description: "Leadership technique sur des projets web complexes, mentorat des développeurs juniors et contribution à l'architecture logicielle.",
    },
    {
      id: uuidv4(),
      jobTitle: "Développeur Web",
      company: "Web Innovators",
      startDate: "2019",
      endDate: "2021",
      description: "Développement de fonctionnalités front-end et back-end pour des applications SaaS, amélioration des performances et de l'expérience utilisateur.",
    },
  ],
  academicBackground: [
    {
      id: uuidv4(),
      degree: "Master en Informatique",
      school: "Université de Paris",
      startDate: "2017",
      endDate: "2019",
    },
  ],
  trainings: [
    {
      id: uuidv4(),
      name: "Certification AWS Certified Developer",
      organization: "Amazon Web Services",
      year: "2022",
    },
  ],
  skills: [
    { id: uuidv4(), name: "React" },
    { id: uuidv4(), name: "Node.js" },
    { id: uuidv4(), name: "TypeScript" },
    { id: uuidv4(), name: "SQL" },
    { id: uuidv4(), name: "Docker" },
  ],
  interests: [
    { id: uuidv4(), name: "Randonnée" },
    { id: uuidv4(), name: "Photographie" },
    { id: uuidv4(), name: "Jeux de société" },
  ],
};
