export {}; // important: makes this file a module

declare global {
  type Status = "active" | "incomplete" | "completed";
  
  interface Task {
    id: number;
    title: string;
    status: Status;
    description: string;
  }
}