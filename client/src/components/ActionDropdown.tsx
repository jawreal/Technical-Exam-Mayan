import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState, memo, type JSX } from "react";
import TaskDialog from "@/components/TaskDialog";

type Actions = "edit" | "delete";

interface ActionProps {
  id: string;
  status: Status; // Incomplete or complete
  children: JSX.Element;
  prevData: TaskFormData;
}

const ACTIONS_OPTIONS: Actions[] = ["edit", "delete"];

function ActionDropdown(props: ActionProps) {
  const [openTaskDialog, setOpenTaskDialog] = useState<boolean>(false);
  const { id, status, children, prevData  } = props;
  const handleTask = () => {
    setOpenTaskDialog(true);
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
        {children /* Render the button */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mr-3 min-w-32">
        <DropdownMenuGroup>
          {ACTIONS_OPTIONS.map((option: Actions) => (
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleTask();
              }}
              id={option as string}
              key={option as string}
              className="capitalize"
            >
              {option}
            </DropdownMenuItem>
          ))}
          <div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs">Mark as</span>
                <span>Complete</span>
              </div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(ActionDropdown);
