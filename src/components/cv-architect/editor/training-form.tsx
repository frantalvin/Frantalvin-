"use client";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { CvData } from "@/lib/cv-schema";
import { v4 as uuidv4 } from 'uuid';

export function TrainingForm() {
  const { control } = useFormContext<CvData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "trainings",
  });

  return (
    <div className="space-y-6">
      {fields.map((item, index) => (
        <div key={item.id} className="p-4 border rounded-lg space-y-4 relative">
          <FormField
            control={control}
            name={`trainings.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la formation</FormLabel>
                <FormControl>
                  <Input placeholder="Certification..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name={`trainings.${index}.organization`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organisme</FormLabel>
                  <FormControl>
                    <Input placeholder="Organisme de formation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`trainings.${index}.year`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Année</FormLabel>
                  <FormControl>
                    <Input placeholder="2023" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ id: uuidv4(), name: "", organization: "", year: "" })}
      >
        <Plus className="mr-2 h-4 w-4" />
        Ajouter une formation
      </Button>
    </div>
  );
}
