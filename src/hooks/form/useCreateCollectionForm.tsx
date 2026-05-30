import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const createCollectionSchema = z.object({
  name: z.string().min(1, 'Collection name is required'),
});

export type CreateCollectionValues = z.infer<typeof createCollectionSchema>;

export const useCreateCollectionForm = () => useForm({
  resolver: zodResolver(createCollectionSchema),
  defaultValues: {
    name: '',
  }
});