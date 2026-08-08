import { Label } from "@/components/ui/label";
import { type ReactNode } from "react";

interface FieldProps { 
  label: string; 
  error?: string; 
  children: ReactNode; // Input or Textarea 
}

export default function FormField({ 
  label, 
  error, 
  children 
}: FieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm text-gray-700">{label}</Label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}