import { type LucideIcon, Circle, CheckCircle } from "lucide-react";

export const STATUS_ICONS: Record<Status, LucideIcon> = {
  incomplete: Circle, 
  complete: CheckCircle, 
}