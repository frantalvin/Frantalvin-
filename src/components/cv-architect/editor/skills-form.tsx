"use client";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { CvData } from "@/lib/cv-schema";
import { v4 as uuidv4 } from 'uuid';

export function SkillsForm() {
  const { control } = useFormContext<CvData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <div className="space-y-4">
       <p className="text-sm text-muted-foreground">Listez vos compétences techniques et non-techniques.</p>
      {fields.map((item, index) => (
        <div key={item.id} className="flex items-center gap-2">
          <FormField
            control={control}
            name={`skills.${index}.name`}
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input placeholder="Ex: React" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
            className="shrink-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ id: uuidv4(), name: "" })}
      >
        <Plus className="mr-2 h-4 w-4" />
        Ajouter une compétence
      </Button>
    </div>
  );
}
