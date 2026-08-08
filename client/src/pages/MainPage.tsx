import { Button } from "@/components/ui/button";
import TaskCard from "@/components/TaskCard";
import SearchInput from "@/components/SearchInput";
import FilterDropdown from "@/components/FilterDropdown";
import TaskDialog from "@/components/TaskDialog";
import { useState } from "react";
import { Plus, Loader, AlertCircle } from "lucide-react";
import { type ChangeEvent } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import getAllTasks from "@/services/getAllTasks";

export default function MainPage () {
  const [filterBy, setFilterBy] = useState<FilterBy>("all");
  const [openAddTask, setOpenAddTask] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>(""); 
  const debouncedValue = useDebounce(searchValue); // Optimized search value 

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tasks-data", filterBy, debouncedValue], 
    queryFn: () => getAllTasks({
      filter: filterBy, 
      query: debouncedValue, 
    })
  }); // For querying data
  
  // For adding task
  const handleAddTask = () => {
    setOpenAddTask(true)
  };
  
  // Search functionality
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }
  
  return (
    <div className="p-5 flex flex-col bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl mx-auto flex flex-col flex-1">
        <h1 className="font-bold text-2xl md:text-3xl mb-3">Task Management</h1>
        <div className="flex flex-col md:flex-row gap-y-3 md:gap-x-4" >
          {/* Search input */} 
          <SearchInput value={searchValue} onChange={onSearchChange} />
          
          <div className="ml-auto flex gap-x-3">
             {/* Filter drop-down */} 
             <FilterDropdown
               state={filterBy} 
               setState={setFilterBy}
             />
             
             {/* Button for adding task */} 
             <Button 
               onClick={handleAddTask}
               className="rounded-lg"
              >
              Add Task
              <Plus />
             </Button>  
             <TaskDialog
               open={openAddTask} 
               onOpenChange={setOpenAddTask}
             />
          </div>
        </div>

        {/* Loading state — centered */}
        {isLoading && (
          <div className="flex flex-1 items-center justify-center py-20">
            <Loader size={40} className="animate-spin text-gray-600" />
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div className="flex flex-1 flex-col items-center justify-center py-20 text-center gap-2">
            <AlertCircle size={30} className="text-red-500" />
            <p className="text-red-600 font-medium">
              Something went wrong while loading tasks.
            </p>
            <p className="text-sm text-gray-500">
              {error instanceof Error ? error.message : "Please try again later."}
            </p>
          </div>
        )}

        {/* Data state */}
        {!isLoading && !isError && (
          <div className="mt-5 columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {data?.tasks?.map((task: Task) => (
              <div key={task.id} className="break-inside-avoid mb-4">
                <TaskCard 
                 id={task.id}
                 title={task.title}
                 status={task.status}
                 description={task.description}
               />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}