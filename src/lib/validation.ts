import { z } from "zod";

const requiredString = z.string().min(1, "Required");

const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file,"
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 *2;
  }, "File must be less than 2MB");

export const VendorFilterValues = z.object({
  q: z.string().optional(),
  date: z.string().optional(),
  vendorType: z.string().optional(),
})

