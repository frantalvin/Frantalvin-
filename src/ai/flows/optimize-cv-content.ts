'use server';

/**
 * @fileOverview An AI agent that optimizes CV content based on a specified career objective.
 *
 * - optimizeCvContent - A function that handles the CV content optimization process.
 * - OptimizeCvContentInput - The input type for the optimizeCvContent function.
 * - OptimizeCvContentOutput - The return type for the optimizeCvContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeCvContentInputSchema = z.object({
  careerObjective: z
    .string()
    .describe('The career objective to tailor the CV content towards.'),
  cvSection: z.string().describe('The text content of the CV section to optimize.'),
});
export type OptimizeCvContentInput = z.infer<typeof OptimizeCvContentInputSchema>;

const OptimizeCvContentOutputSchema = z.object({
  optimizedCvSection: z
    .string()
    .describe('The optimized text content of the CV section.'),
});
export type OptimizeCvContentOutput = z.infer<typeof OptimizeCvContentOutputSchema>;

export async function optimizeCvContent(input: OptimizeCvContentInput): Promise<OptimizeCvContentOutput> {
  return optimizeCvContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeCvContentPrompt',
  input: {schema: OptimizeCvContentInputSchema},
  output: {schema: OptimizeCvContentOutputSchema},
  prompt: `You are a career expert specializing in optimizing CV content.

You will use the career objective to optimize the CV section and enhance its impact and relevance to potential employers.

Career Objective: {{{careerObjective}}}

CV Section: {{{cvSection}}}

Optimize the CV section to align with the career objective. Focus on making the language more compelling and relevant to the specified objective.`,
});

const optimizeCvContentFlow = ai.defineFlow(
  {
    name: 'optimizeCvContentFlow',
    inputSchema: OptimizeCvContentInputSchema,
    outputSchema: OptimizeCvContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
