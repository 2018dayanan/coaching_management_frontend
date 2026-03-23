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
import { MoreHorizontal, User, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type TeacherStudent = {
  id: string;
  profileImg: string;
  name: string;
  uniqueId: string;
  email: string;
  status: string;
};

export const columns: ColumnDef<TeacherStudent>[] = [
  {
    accessorKey: "profileImg",
    header: "Avatar",
    cell: ({ row }) => {
      const { profileImg } = row.original;
      return (
        <div className="flex justify-center items-center">
          <img
            src={profileImg || "https://github.com/shadcn.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-border object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Student Name",
    cell: ({ row }) => (
      <div className="font-semibold text-foreground">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "uniqueId",
    header: "ID",
    cell: ({ row }) => (
      <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground uppercase tracking-widest font-bold">
        {row.original.uniqueId}
      </code>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status || "active";
      return (
        <Badge variant={status === "active" ? "default" : "secondary"} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original;
      const navigate = useNavigate();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Student Actions</DropdownMenuLabel>
            <DropdownMenuItem 
              onClick={() => navigate(`/teacher/dashboard/students/${student.id}`)} 
              className="gap-2 cursor-pointer"
            >
              <User className="h-4 w-4 text-primary" />
              View Performance
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <GraduationCap className="h-4 w-4 text-emerald-500" />
              Manage Enrollments
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
