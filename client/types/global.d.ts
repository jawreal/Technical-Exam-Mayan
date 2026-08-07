export {}; // important: makes this file a module

declare global {
  type Status = "incomplete" | "complete";
  type FilterBy = "all" | "completed" | Extract<Status, "incomplete">; // The difference of this is "completed" not "complete" from status
  
  // For task data 
  interface Task {
    id: number;
    title: string;
    status: Status;
    description: string;
  }
  
  // For adding and updating task
  interface TaskFormData extends Pick<Task, "title" | "description"> {}
   
}