"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Batch = {
  id: string
  name: string
  subject: string
  teacher_name?: string
  start_date: string
  end_date: string
  status: "active" | "completed"
}

export const columns: ColumnDef<Batch>[] = [
  {
    accessorKey: "name",
    header: "Batch Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-foreground">{row.getValue("name")}</span>
        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">ID: {row.original.id.slice(-6)}</span>
      </div>
    ),
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => <Badge variant="outline" className="font-medium bg-blue-500/5 text-blue-600 border-blue-500/20">{row.getValue("subject")}</Badge>,
  },
  {
    accessorKey: "teacher_name",
    header: "Instructor",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xs">
          {(row.getValue("teacher_name") as string)?.[0] || "T"}
        </div>
        <span className="text-sm font-medium">{row.getValue("teacher_name") || "Unassigned"}</span>
      </div>
    ),
  },
  {
    accessorKey: "start_date",
    header: "Schedule",
    cell: ({ row }) => {
      const start = new Date(row.getValue("start_date"))
      const end = new Date(row.original.end_date)
      return (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge 
          className={status === "active" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-slate-500/10 text-slate-600 border-slate-500/20"}
          variant="outline"
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted rounded-full">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 shadow-xl border-white/5 bg-card/95 backdrop-blur-xl">
            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground opacity-70">Control Panel</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 focus:bg-secondary focus:text-white transition-colors cursor-pointer rounded-md m-1">
                <Pencil className="h-4 w-4" />
                Edit Batch
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive gap-2 focus:bg-destructive focus:text-white transition-colors cursor-pointer rounded-md m-1">
                <Trash className="h-4 w-4" />
                Archive Batch
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
