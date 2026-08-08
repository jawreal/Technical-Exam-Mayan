import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"; 
import { useState, type ReactNode } from "react"; 
import TaskDialog from "@/components/TaskDialog"; 

type Status = "complete" | "incomplete";

interface ActionProps { 
  id: string; 
  status: Status; 
  children: ReactNode; 
  prevData: TaskFormData; 
}

export default function ActionDropdown({ id, status, children, prevData }: ActionProps) { 
  const [openTaskDialog, setOpenTaskDialog] = useState(false); 

  const handleEdit = () => setOpenTaskDialog(true);
  
  const handleDelete = () => {
    // TODO: call deleteTask(id)
    console.log("delete", id);
  };

  const handleToggleStatus = () => {
    const newStatus: Status = status === "complete" ? "incomplete" : "complete";
    // TODO: call updateTask({ id, status: newStatus })
    console.log("toggle to", newStatus, id);
  };

  return ( 
    <DropdownMenu> 
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
          <DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleEdit(); }}>
            Edit
          </DropdownMenuItem> 
          <DropdownMenuItem onSelect={(e) => { e.preventDefault(); handleDelete(); }} className="text-red-600">
            Delete
          </DropdownMenuItem> 
        </DropdownMenuGroup>

        <DropdownMenuSeparator /> 

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