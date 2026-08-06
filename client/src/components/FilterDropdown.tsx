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
import { useCallback, memo, type JSX } from "react";

interface IFilterDropdown<T> {
  state: T;
  setState?: Dispatch<SetStateAction<T>>;
  options: T[];
}

function FilterDropdown<T>(props: IFilterDropdown<T>) {
  const {
    state,
    setState,
    options,
  } = props;

  const selectOption = useCallback(
    (e: Event) => {
      e.preventDefault();
      {
        /* Set the state based on selected option */
      }
      const id = (e.currentTarget as HTMLElement).id;
      setState?.(id as T);
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
          {options?.map((option: T) => (
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

export default memo(FilterDropdown) as <T>(
  props: IFilterDropdown<T>,
) => JSX.Element; 