import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';

interface TaskProps extends Omit<Task, "id"> {}

export default function TaskCard (props: TaskProps) {
  const { title, status, description } = props;
  
  return (
  <Card className="shadow-none">
    <CardContent className="relative">
       <Button variant="ghost" className="absolute top-2 right-3">
         <Ellipsis size={20} />
       </Button> 
       <CardHeader className="px-0 pb-0 pt-5">
         <CardTitle>{title ?? "No title found"}</CardTitle>
         <CardDescription>
          {description ?? "No description found"}
         </CardDescription>
       </CardHeader>
     </CardContent>
  </Card>
  )
};