import { Button } from "@/components/ui/button";
import TaskCard from "@/components/TaskCard";
import SearchInput from "@/components/SearchInput";
import FilterDropdown from "@/components/FilterDropdown";
import { useState } from "react";
import { Plus } from "lucide-react";

type FilterBy = "all" | "active" | "inactive" | "complete";

const tasks: Task[] = [
  {
    id: 1,
    title: "Create Login Page",
    status: "completed",
    description: "Build the login page with email validation and password requirements."
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    status: "active",
    description: "Create dashboard with charts, stats, and recent activity. Must be responsive on mobile."
  },
  {
    id: 3,
    title: "User Profile",
    status: "completed",
    description: "Allow users to update avatar, name, and bio information."
  },
  {
    id: 4,
    title: "Settings Page",
    status: "incomplete",
    description: "Build settings for notifications, themes, security, and API keys."
  },
  {
    id: 5,
    title: "Email Notifications",
    status: "active",
    description: "Send email when tasks are assigned, completed, or overdue."
  },
  {
    id: 6,
    title: "Generate Reports",
    status: "incomplete",
    description: "Export tasks to PDF and Excel. Include filters by date and status."
  },
  {
    id: 7,
    title: "Task Search & Filter",
    status: "completed",
    description: "Implement search bar and filter by status, date, and assignee."
  },
  {
    id: 8,
    title: "Drag and Drop Tasks",
    status: "active",
    description: "Enable drag and drop to reorder tasks between columns."
  },
  {
    id: 9,
    title: "Dark Mode Toggle",
    status: "completed",
    description: "Add theme switcher with system preference detection."
  },
  {
    id: 10,
    title: "File Upload",
    status: "incomplete",
    description: "Allow attaching files to tasks. Max 10MB per file."
  },
  {
    id: 11,
    title: "Team Members",
    status: "active",
    description: "Create invite system and role management for team members."
  },
  {
    id: 12,
    title: "Calendar View",
    status: "incomplete",
    description: "Show tasks in a monthly calendar with due dates."
  },
  {
    id: 13,
    title: "Comments Section",
    status: "completed",
    description: "Let users comment and reply on tasks with markdown support."
  },
  {
    id: 14,
    title: "Push Notifications",
    status: "active",
    description: "Send browser push notifications for task deadlines."
  },
  {
    id: 15,
    title: "Onboarding Flow",
    status: "incomplete",
    description: "Create 3-step onboarding for new users with tooltips."
  }
];

const FILTER_BY_OPTIONS: FilterBy =["all", "active", "inactive", "complete"]

export default function MainPage () {
  const [filterBy, setFilterBy] = useState<FilterBy>("all")
  return (
    <div className="p-5 flex flex-col gap-y-5 bg-gray-50 min-h-screen">
     <div className="flex flex-col md:flex-row gap-y-3 md:gap-x-4" >
       <SearchInput />
       <div className="ml-auto flex gap-x-3">
          <FilterDropdown
            state={filterBy} 
            setState={setFilterBy}
            options={FILTER_BY_OPTIONS}
          />
          <Button className="rounded-lg">
           Add Task
           <Plus />
          </Button>  
       </div>
     </div>
     <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="break-inside-avoid mb-4">
            <TaskCard 
             title={task.title}
             status={task.status}
             description={task.description}
           />
          </div>
        ))}
     </div>
    </div>
  )
}