"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CvData } from "@/lib/cv-schema";
import { Label } from "@/components/ui/label";

type PersonalDetailsFormProps = {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function PersonalDetailsForm({
  onImageUpload,
}: PersonalDetailsFormProps) {
  const { control } = useFormContext<CvData>();
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="personalInfo.fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom complet</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Alexandre Dubois" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="personalInfo.jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Titre du poste</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Développeur Full-Stack" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="personalInfo.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Ex: a.dubois@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="personalInfo.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 06 12 34 56 78" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="personalInfo.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse</FormLabel>
            <FormControl>
              <Input placeholder="Ex: 123 Rue de la République, Paris" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       <div className="space-y-2">
          <Label htmlFor="picture">Photo de profil</Label>
          <Input id="picture" type="file" accept="image/*" onChange={onImageUpload} />
          <p className="text-xs text-muted-foreground">Téléchargez une photo professionnelle (format carré de préférence).</p>
        </div>
    </div>
  );
}
