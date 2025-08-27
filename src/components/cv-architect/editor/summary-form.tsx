"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CvData } from "@/lib/cv-schema";
import { OptimizeButton } from "./optimize-button";

export function SummaryForm() {
  const { control } = useFormContext<CvData>();
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Résumé / Objectif de carrière</FormLabel>
              <OptimizeButton fieldName="summary" />
            </div>
            <FormControl>
              <Textarea
                rows={5}
                placeholder="Décrivez en quelques phrases votre profil et vos objectifs professionnels..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
