export interface AboutFormProps {
  onSubmit: (data: string) => void;
  isLoading?: boolean;
  initialData?: string;
  mode?: "create" | "edit";
}

interface AboutCardProps {
  title: string;
  children: React.ReactNode;
  reverse?: boolean;
}
