import TaskCard from "@/components/TaskCard";
import SearchInput from "@/components/SearchInput";

export default function MainPage () {
  return (
    <div className="p-5 flex flex-col gap-y-5">
     <div>
       <SearchInput />
     </div>
     <TaskCard />
    </div>
  )
}