import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const updateCollectionSchema = z.object({
  name: z.string().min(1, 'Collection name cannot be empty').optional(),
});

export type UpdateCollectionValues = z.infer<typeof updateCollectionSchema>;

export const useUpdateCollectionForm = () => useForm({
  resolver: zodResolver(updateCollectionSchema),
  defaultValues: {
    name: '',
  }
});