import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, FileText, Pencil, Trash, Calendar } from "lucide-react";

export type TeacherTask = {
  id: string;
  title: string;
  subject: string;
  batchName: string;
  dueDate: string;
  assignedDate: string;
};

export const columns: ColumnDef<TeacherTask>[] = [
  {
    accessorKey: "title",
    header: "Task Title",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
          <FileText className="h-4 w-4" />
        </div>
        <span className="font-bold text-foreground italic uppercase tracking-tight">{row.original.title}</span>
      </div>
    ),
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <Badge variant="outline" className="border-indigo-400/20 text-indigo-600 bg-indigo-500/5 uppercase text-[10px] font-black">
        {row.original.subject}
      </Badge>
    ),
  },
  {
    accessorKey: "batchName",
    header: "Batch",
    cell: ({ row }) => (
      <div className="text-sm font-medium text-muted-foreground uppercase italic">{row.original.batchName}</div>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-500/10 px-2 py-1 rounded-lg w-fit">
        <Calendar className="h-3.5 w-3.5" />
        {new Date(row.original.dueDate).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 rounded-xl">
            <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Pencil className="h-4 w-4 text-primary" />
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive gap-2 cursor-pointer">
              <Trash className="h-4 w-4" />
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
