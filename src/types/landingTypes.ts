import { contactSchema } from "@/schema/landingSchema";
import { z } from "zod";
export type ContactFormData = z.infer<typeof contactSchema>;
