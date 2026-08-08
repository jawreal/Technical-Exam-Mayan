import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuGroup, } from "@/components/ui/dropdown-menu";
import { useState, type ReactNode } from "react";
import TaskDialog from "@/components/TaskDialog";
import { CustomToast } from "@/components/CustomToast";
import { useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/apiClient";

type Status = "complete" | "incomplete";
type ApiResponse = string | undefined;

interface UpdateTaskStatus extends Pick<Task, "id"> {
  status: Status // Located at types/global.d.ts 
};
interface DeleteTask extends Pick<Task, "id"> {}; // UpdateFormData is at types/global.d.ts 


interface ActionProps {
  id: string;
  status: Status;
  children: ReactNode;
  prevData: TaskFormData;
}

export default function ActionDropdown({ id, status, children, prevData }: ActionProps) {
  const queryClient = useQueryClient();
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  
  // For opening edit dialog
  const handleEdit = () => setOpenTaskDialog(true);
  
  // For processing delete & update status
  const handleSubmit = async (fn: () => Promise<ApiResponse>) => {
    try {
      const message = await fn();
      queryClient.invalidateQueries({ queryKey: ["tasks-data"] }); // Refresh all tasks
      
      if(message) {
        CustomToast({ description: message, status: "success" });
      }
    } catch(error) {
      CustomToast({ 
        description: error instanceof Error ? error.message : "Something went wrong", 
        status: "error" 
      });
    }
  };
  
  // For handling delete task
  const handleDelete = async () => {
    await handleSubmit(() => 
      apiClient<DeleteTask>("/api/delete-task", { 
        method: "DELETE", 
        body: { id } 
      })
    );
  };

  // For handling mark as complete/incomplete 
  const handleToggleStatus = async () => {
    const newStatus: Status = status === "complete" ? "incomplete" : "complete";
    await handleSubmit(() => 
      apiClient<UpdateTaskStatus>("/api/update-status", { 
        method: "PATCH", 
        body: { id, status: newStatus } 
      })
    );
  };

  return (
    <DropdownMenu>
      {/* Task dialog form */}
      <TaskDialog 
        id={id} 
        isUpdate={true} 
        open={openTaskDialog} 
        prevData={prevData} 
        onOpenChange={setOpenTaskDialog} 
      />
      
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mr-3 min-w-32">
        <DropdownMenuGroup>
          {/* Edit option */} 
          <DropdownMenuItem onSelect={(e) => {
            e.preventDefault(); // For stopping bug 
            handleEdit(); 
          }}>
            Edit
          </DropdownMenuItem>
          
          {/* Delete option */}
          <DropdownMenuItem onSelect={(e) => {
            e.preventDefault();
            handleDelete();
          }} className="text-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        
        {/* Mark as complete/incomplete option */} 
        <DropdownMenuItem onSelect={(e) => {
          e.preventDefault();
          handleToggleStatus();
        }}>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs">Mark as</span>
            <span>{status === "complete" ? "Incomplete" : "Complete"}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}