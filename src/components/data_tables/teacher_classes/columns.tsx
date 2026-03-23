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
import { MoreHorizontal, Video, Pencil, Trash, Calendar, Clock, ExternalLink } from "lucide-react";
import { type TeacherClass } from "@/api/educationTeacherApi";

export const columns = (
  onEdit: (cls: TeacherClass) => void,
  onDelete: (id: string) => void
): ColumnDef<TeacherClass>[] => [
  {
    accessorKey: "title",
    header: "Class Title",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
          <Video className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-foreground italic uppercase tracking-tight">
            {row.original.title}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase font-black opacity-60">
            {row.original.subject}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "batch_id",
    header: "Batch",
    cell: ({ row }) => {
      const batchName = typeof row.original.batch_id === 'object' ? row.original.batch_id.name : "N/A";
      return (
        <Badge variant="outline" className="border-indigo-400/20 text-indigo-600 bg-indigo-500/5 uppercase text-[10px] font-black">
          {batchName}
        </Badge>
      );
    },
  },
  {
    accessorKey: "class_date",
    header: "Schedule",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground">
          <Calendar className="h-3.5 w-3.5 text-indigo-500" />
          {new Date(row.original.class_date).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase">
          <Clock className="h-3 w-3" />
          {row.original.class_time}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meeting_link",
    header: "Session Link",
    cell: ({ row }) => (
      <a 
        href={row.original.meeting_link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-600 font-bold text-xs underline underline-offset-4"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        Join Room
      </a>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const cls = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 rounded-xl">
            <DropdownMenuLabel className="text-xs font-black uppercase text-muted-foreground opacity-60">Class Actions</DropdownMenuLabel>
            <DropdownMenuItem 
              className="gap-2 cursor-pointer font-bold uppercase italic text-xs tracking-tighter"
              onClick={() => onEdit(cls)}
            >
              <Pencil className="h-4 w-4 text-primary" />
              Edit Session
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive gap-2 cursor-pointer font-bold uppercase italic text-xs tracking-tighter"
              onClick={() => onDelete(cls._id)}
            >
              <Trash className="h-4 w-4" />
              Cancel Class
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
