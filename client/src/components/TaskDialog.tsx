import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Dispatch, SetStateAction } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { CustomToast } from "@/components/CustomToast";
import addTask from "@/services/addTask";
import updateTask from "@/services/updateTask";
import FormField from "@/components/FormField"; 
import { useQueryClient } from "@tanstack/react-query";

interface TaskDialogProps {
  open: boolean;
  id?: string;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  isUpdate?: boolean;
  prevData?: TaskFormData;
}

const defaultEmptyValues: TaskFormData = { title: "", description: "" };

export default function TaskDialog({ 
  open, 
  id, 
  onOpenChange, 
  prevData, 
  isUpdate = false 
}: TaskDialogProps) {
  const queryClient = useQueryClient();

  const { 
    register, 
    reset, 
    handleSubmit, 
    formState: { isSubmitting, errors } 
  } = useForm<TaskFormData>({
    defaultValues: defaultEmptyValues,
    mode: "onChange",
  });

  const handleSave = async (data: TaskFormData) => {
    if (isUpdate) {
      if (!id) throw new Error("Missing task id");
      await updateTask({ ...data, id });
      CustomToast({ description: "Task has been updated", status: "success" });
    } else {
      await addTask(data);
      CustomToast({ description: "Task has been added", status: "success" });
    }
  };

  const onSubmit: SubmitHandler<TaskFormData> = async (data) => {
    try {
      await handleSave(data);
      reset(defaultEmptyValues);
      queryClient.invalidateQueries({ queryKey: ["tasks-data"] });
      onOpenChange(false);
    } catch (error) {
      CustomToast({ 
        description: error instanceof Error ? error.message : "Something went wrong", 
        status: "error" 
      });
    }
  };

  // Reset when dialog opens
  useEffect(() => {
    if (open) {
      reset(isUpdate && prevData ? prevData : defaultEmptyValues);
    }
  }, [open, isUpdate, prevData, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="text-left">
            <DialogTitle>{isUpdate ? "Update Task" : "Add Task"}</DialogTitle>
            <DialogDescription>
              {isUpdate 
                ? "Make changes to the task title and description" 
                : "Fill in the details to add a new task to your board."}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-3 space-y-4 mb-4">
            <FormField label="Title" error={errors.title?.message}>
              <Input 
                placeholder="Enter task title" 
                {...register("title", { required: "Task title is required" })} 
              />
            </FormField>

            <FormField label="Description" error={errors.description?.message}>
              <Textarea 
                placeholder="Enter task description" 
                rows={4} 
                {...register("description", { required: "Description is required" })} 
              />
            </FormField>
          </div>

          <DialogFooter className="flex flex-row justify-end gap-x-3">
            <DialogClose asChild>
              <Button variant="outline" type="button" className="rounded-lg">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" className="rounded-lg" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isUpdate ? "Save Changes" : "Save Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
