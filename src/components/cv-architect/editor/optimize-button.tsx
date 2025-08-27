"use client";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { optimizeCvContent } from "@/ai/flows/optimize-cv-content";
import { useToast } from "@/hooks/use-toast";
import type { CvData } from "@/lib/cv-schema";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type FieldName = "summary" | `experience.${number}.description`;

export function OptimizeButton({ fieldName }: { fieldName: FieldName }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getValues, setValue } = useFormContext<CvData>();
  const { toast } = useToast();

  const handleOptimize = async () => {
    setIsLoading(true);
    try {
      const careerObjective = getValues("summary");
      const cvSection = getValues(fieldName);

      if (!careerObjective.trim()) {
        toast({
          title: "Objectif de carrière manquant",
          description:
            "Veuillez d'abord remplir votre résumé/objectif de carrière.",
          variant: "destructive",
        });
        return;
      }

      if (!cvSection.trim()) {
        toast({
          title: "Contenu manquant",
          description: "Le champ que vous essayez d'optimiser est vide.",
          variant: "destructive",
        });
        return;
      }

      const result = await optimizeCvContent({ careerObjective, cvSection });
      setValue(fieldName, result.optimizedCvSection, { shouldDirty: true, shouldValidate: true });
      toast({
        title: "Contenu optimisé !",
        description: "La suggestion de l'IA a été appliquée.",
      });
    } catch (error) {
      console.error("Optimization failed:", error);
      toast({
        title: "Erreur d'optimisation",
        description: "Impossible d'optimiser le contenu. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleOptimize}
            disabled={isLoading}
            className="h-8 w-8 shrink-0"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            ) : (
              <Sparkles className="h-4 w-4 text-primary/70 hover:text-primary transition-colors" />
            )}
            <span className="sr-only">Optimiser avec l'IA</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Optimiser avec l'IA</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
