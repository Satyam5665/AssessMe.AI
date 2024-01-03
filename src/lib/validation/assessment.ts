import { z } from "zod";

export const createAssessmentSchema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  careerProfile: z.string().min(1, { message: "Career Profile is required" }),
  employmentTile: z
    .string()
    .min(1, { message: "Employment Title is required" }),
  companyDetails: z.string().min(1, { message: "Company Details is required" }),
  profileRequirements: z
    .string()
    .min(1, { message: "Profile Requirements is required" }),
  questions: z.array(z.string()).refine((data) => data.length >= 3, {
    message: "At least three questions are required",
  }),
});

export const updateAssessmentSchema = createAssessmentSchema.extend({
  id: z.string().min(1),
});

export const deleteAssessmentSchema = z.object({
  id: z.string().min(1),
});

export type CreateEventSchema = z.infer<typeof createAssessmentSchema>;
