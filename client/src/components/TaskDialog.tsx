import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Dispatch, SetStateAction } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { CustomToast } from "@/components/CustomToast";
import addTask from "@/services/addTask";

interface DialogProps {
  open: boolean;
  id?: string; // Optional only for update
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  isUpdate?: boolean;
}

export default function TaskDialog (props: DialogProps) {
  const { open, id, onOpenChange, isUpdate = false } = props;

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TaskFormData>({
    mode: "onChange", // Needed for onChange validation so error message would appear
  });

  // Submit handler
  const onSubmit: SubmitHandler<TaskFormData> = useCallback(
    async (data) => {
      console.log(data)
      /* reset();
      queryClient.invalidateQueries({ queryKey: ["admin-records"], });
      */
      
      try{
        if(isUpdate){
          
        }else{
          await addTask(data)
        }
        
        // Show pop up
        CustomToast({
          description: isUpdate ? "Task has been updated" : "Task has been added", 
          status: "success"
        });
        
        // Close the dialog 
        onOpenChange(false)
      }catch(error){
        CustomToast({
          description: error instanceof Error ? error.message : "Something went wrong", 
          status: "error"
        });
      }
    },
    [onOpenChange, isUpdate], // add deps
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="text-left">
            <DialogTitle>{isUpdate? "Update Task" : "Add Task"}</DialogTitle>
            <DialogDescription>
              {isUpdate
               ? "Make changes to the task title, and description"
                : "Fill in the details to add a new task to your board."
              }
            </DialogDescription>
          </DialogHeader>

          <div className="mt-3 flex flex-col gap-y-3 [&_label]:text-sm mb-2 [&_label]:text-gray-700">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                placeholder="Enter task title"
                id="title"
                {...register("title", { required: "Task title is required" })}
              />
              {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>} {/* Show error */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Enter task description"
                id="description"
                rows={4}
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>} {/* Show error */}
            </div>
          </div>

          <DialogFooter className="flex flex-row justify-end gap-x-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                className="rounded-lg"
                onClick={() => reset()} // reset on close
              >
                Close
              </Button>
            </DialogClose>
            <Button type="submit" className="rounded-lg" disabled={isSubmitting}>
              {/* type submit */}
              {isSubmitting ? "Saving..." : (isUpdate ? "Save Changes" : "Save Task")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
};