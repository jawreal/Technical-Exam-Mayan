import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';

interface IProps {
  title: string; 
  status: string;
  description: string;
}

export default function TaskCard (props: IProps) {
  const { title, status, description } = props;
  
  return (
  <Card>
    <CardContent className="relative">
       <Button variant="ghost" className="absolute top-3 right-3">
         <Ellipsis size={20} />
       </Button> 
       <CardHeader className="px-0 pb-0 pt-5">
         <CardTitle>Card Title</CardTitle>
         <CardDescription>Card Description
         </CardDescription>
       </CardHeader>
     </CardContent>
  </Card>
  )
};