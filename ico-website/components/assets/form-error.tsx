import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string; // Made optional
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <div
      className="bg-red-50 dark:bg-destructive/15 p-2.5 rounded-md flex items-center gap-x-2
        text-sm text-red-500 dark:text-destructive"
    >
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
