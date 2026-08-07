import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ellipsis } from "lucide-react";
import ActionDropdown from "@/components/ActionDropdown";
import { STATUS_ICONS } from "@/lib/statusIcon";
import { useMemo } from "react";

interface TaskProps extends Task {}

export default function TaskCard(props: TaskProps) {
  const { id, status, ...rest } = props;
  const Icon = useMemo(() => {
    return STATUS_ICONS[status];
  }, [status]);

  return (
    <Card className="shadow-none">
      <CardContent className="relative">
        <ActionDropdown status={status} id={id} prevData={rest}>
          <Button variant="ghost" className="absolute top-2 right-3">
            <Ellipsis size={20} />
          </Button>
        </ActionDropdown>
        <CardHeader className="px-0 pb-0 pt-5">
          <div className="flex flex-col gap-y-2 w-[calc(100%-20px)]">
            <CardTitle>{rest?.title ?? "No title found"}</CardTitle>
            <Badge
              variant={status}
              className="rounded-full gap-x-1 capitalize px-2 py-1 self-start text-xs"
            >
              <Icon size={13} />
              {status}
            </Badge>
          </div>
          <CardDescription className="mt-10">
            {rest?.description ?? "No description found"}
          </CardDescription>
        </CardHeader>
      </CardContent>
    </Card>
  );
}
