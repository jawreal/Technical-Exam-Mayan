import { Button } from "@/components/ui/button";
import { Check, ListFilter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
} from "@/components/ui/dropdown-menu";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, memo } from "react";

interface FilterDropdown {
  state: FilterBy; // FilterBy is located at global types
  setState?: Dispatch<SetStateAction<FilterBy>>;
}

const FILTER_BY_OPTIONS: FilterBy[] =["all", "incomplete", "completed"]

function FilterDropdown (props: FilterDropdown) {
  const {
    state,
    setState,
  } = props;

  const selectOption = useCallback(
    (e: Event) => {
      e.preventDefault();
      // It based on option 
      const id = (e.currentTarget as HTMLElement).id;
      setState?.(id as FilterBy);
    },
    [setState],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="font-inter rounded-lg justify-between px-3 text-gray-600 dark:text-gray-200"
          id={state as string}
        >
          <span className="capitalize" >{state as string}</span>
          <ListFilter className="text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
      >
        <DropdownMenuGroup>
          <div>
            <DropdownMenuLabel>
              Filter by
            </DropdownMenuLabel> 
            <DropdownMenuSeparator />
          </div>
          {FILTER_BY_OPTIONS.map((option: FilterBy) => (
            <DropdownMenuItem
              onSelect={selectOption}
              id={option as string}
              key={option as string}
              className="capitalize"
            >
              {option as string}
              {state === option && <Check className="ml-auto" />}{" "}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(FilterDropdown);