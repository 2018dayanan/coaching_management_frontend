import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Users, MoreHorizontal, Pencil } from "lucide-react";

export type TeacherBatchTableData = {
  _id: string;
  name: string;
  subject: string;
  status: string;
  startDate: string;
  endDate: string;
  studentCount: number;
  original: any; 
};

export const columns = (
  onViewDetails: (batch: any) => void,
  onEdit: (batch: any) => void
): ColumnDef<TeacherBatchTableData>[] => [
  {
    accessorKey: "name",
    header: "Batch Name",
    cell: ({ row }) => (
      <div className="font-bold text-foreground italic uppercase tracking-tight">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-indigo-500/5 text-indigo-600 border-indigo-500/10 font-bold uppercase text-[10px]">
        {row.original.subject}
      </Badge>
    ),
  },
  {
    accessorKey: "studentCount",
    header: "Students",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 font-medium text-muted-foreground">
        <Users className="h-4 w-4 text-indigo-400" />
        {row.original.studentCount}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge 
          variant={status === "active" ? "default" : "secondary"}
          className={`uppercase text-[10px] font-black px-2 py-0.5 ${
            status === "active" 
              ? "bg-emerald-500 hover:bg-emerald-600" 
              : "bg-muted text-muted-foreground"
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 rounded-xl">
          <DropdownMenuLabel className="font-bold text-xs uppercase text-muted-foreground tracking-widest">Controls</DropdownMenuLabel>
          <DropdownMenuItem 
            className="gap-2 cursor-pointer font-medium text-xs uppercase italic tracking-tighter"
            onClick={() => onViewDetails(row.original.original)}
          >
            <Eye className="h-4 w-4 text-indigo-500" />
            Directory Detail
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="gap-2 cursor-pointer font-medium text-xs uppercase italic tracking-tighter"
            onClick={() => onEdit(row.original.original)}
          >
            <Pencil className="h-4 w-4 text-primary" />
            Modify Module
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
