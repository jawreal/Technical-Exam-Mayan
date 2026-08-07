import { toast } from "sonner";

interface CustomToastProps {
  description?: string;
  status?: "info" | "success" | "error";
}

export const CustomToast = ({
  description,
  status,
}: CustomToastProps) => {
  if (!description || !status) return;
  toast[status](description, {
    className: "!bg-white !border-gray-200 !text-gray-500",
    duration: 3000,
    position: "bottom-right",
  });
};