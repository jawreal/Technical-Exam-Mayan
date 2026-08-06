import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,  
  DialogClose, 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Dispatch, SetStateAction } from "react";

interface DialogProps {
  open: boolean;
  id?: string; // Optional only for update
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  isUpdate?: boolean;
}

export default function TaskDialog (props: DialogProps) {
  const { open, id, onOpenChange, isUpdate = false } = props;
  return (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>{isUpdate ? "Update Task" : "Add Task"}</DialogTitle>
         <DialogDescription>
          {isUpdate 
            ? "Make changes to the task title, description, and status." 
           : "Fill in the details to add a new task to your board."
          }
         </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-y-3 [&_label]:text-sm mb-2 [&_label]:text-gray-700">
         <div className="space-y-2">  <Label htmlFor="title">
             Title
           </Label>
           <Input placeholder="Enter task title" id="title" />
        </div>
        <div className="space-y-2">  <Label htmlFor="description">
             Description
           </Label>
           <Textarea placeholder="Enter task description" id="description" rows={4} />
        </div> 
      </div>
      <DialogFooter className="flex flex-row justify-end gap-x-3">
         <DialogClose>
           <Button variant="outline" type="button" className="rounded-lg">Close</Button>
         </DialogClose>
         <Button className="rounded-lg">{isUpdate ? "Save Changes" : "Save Task"}</Button>
       </DialogFooter>
    </DialogContent>
  </Dialog> 
  )
};