import { type InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface InputProps extends  InputHTMLAttributes<HTMLInputElement> {};

export default function CustomInput (props: InputProps) {
  return (
    <div className="w-full relative">
      {/* Search icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-zinc-400">
        <Search className="text-gray-400 size-[20px] md:size-[19px]" />
      </div>
      
      {/* Search input */}
      <Input 
        {...props} 
        placeholder="Search..."
        className="h-10 md:h-9 pl-10 rounded-lg shadow-none"
      />
    </div>
  );
};
