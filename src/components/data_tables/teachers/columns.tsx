import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, User, Pencil, Trash, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/hooks/use-model-store";

export type Teacher = {
  id: string;
  unique_id?: string;
  profileImg: string;
  name: string;
  phone: string;
  joined: string;
  status: "active" | "suspended" | "inActive";
  email: string;
  role: "teacher";
};

export const columns: ColumnDef<Teacher>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "profileImg",
    header: "Avatar",
    cell: ({ row }) => {
      const { profileImg, name } = row.original;
      return (
        <div className="flex justify-center items-center">
          {profileImg ? (
            <img
              src={profileImg}
              alt={name}
              className="w-10 h-10 rounded-xl object-cover border-2 border-primary/10 shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold border-2 border-primary/20">
              {name?.[0] || "T"}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Teacher Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-foreground">{row.getValue("name")}</span>
        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
          {row.original.unique_id || `ID: ${row.original.id.slice(-6)}`}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Contact Info",
    cell: ({ row }) => {
      const { phone, email } = row.original;
      return (
        <div className="text-sm space-y-0.5">
          <div className="font-medium">{email}</div>
          <div className="text-[11px] text-muted-foreground font-bold">{phone}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <Badge 
          variant="outline"
          className={status === "active" 
            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold" 
            : "bg-destructive/10 text-destructive border-destructive/20 font-bold"
          }
        >
          {status.toUpperCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "joined",
    header: "Joined Date",
    cell:({row})=>{
      const {joined} = row.original;
      const date = new Date(joined);
      return (
        <div className="text-sm font-medium text-muted-foreground">
          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      );
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const teacher = row.original;
      const navigate = useNavigate();
      const { onOpen } = useModal();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted rounded-full">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 shadow-xl border bg-background backdrop-blur-xl">
            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground opacity-70 font-black">Teacher Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(`/admin/users/${teacher.id}`)} className="gap-2 focus:bg-primary focus:text-white transition-colors cursor-pointer rounded-md m-1">
              <User className="h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpen("editUser", { user: teacher })} className="gap-2 focus:bg-secondary focus:text-white transition-colors cursor-pointer rounded-md m-1">
              <Pencil className="h-4 w-4" />
              Edit Teacher
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onOpen("deleteUser", { id: teacher.id, type: "teacher", name: teacher.name })}
              className="text-destructive gap-2 focus:bg-destructive focus:text-white transition-colors cursor-pointer rounded-md m-1"
            >
              <Trash className="h-4 w-4" />
              Remove Teacher
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              console.log('Verify teacher', teacher.id);
            }} className="gap-2 focus:bg-emerald-500 focus:text-white transition-colors cursor-pointer rounded-md m-1">
              <ShieldCheck className="h-4 w-4" />
              Verify Credentials
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
