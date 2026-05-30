import { ApiError } from "@/lib/errors";

export interface FormActions {
  reset: VoidFunction;
  submit: () => Promise<void>;
}

export type CollectionFormBaseProps = {
  onError?: (error: ApiError) => void;
  onDirtyChange?: (dirty: boolean) => void;
  onSubmittingChange?: (submitting: boolean) => void;
};
