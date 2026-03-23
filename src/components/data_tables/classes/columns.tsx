"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash, Video, Calendar, Clock, ExternalLink, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useModal } from "@/hooks/use-model-store"
import { useNavigate } from "react-router-dom"

export type Class = {
  id: string
  title: string
  subject?: string
  batch_name: string
  batch_id?: string
  class_date: string
  class_time: string
  meeting_link?: string
  teacher_id?: string
  teacher_name?: string
}

const ClassActions = ({ cls }: { cls: Class }) => {
  const { onOpen } = useModal()
  const navigate = useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted rounded-full">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 shadow-xl border bg-background backdrop-blur-xl">
        <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground opacity-70">Session Control</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate(`/admin/classes/${cls.id}`)}
          className="gap-2 focus:bg-primary focus:text-white transition-colors cursor-pointer rounded-md m-1"
        >
          <Eye className="h-4 w-4" />
          View Detail
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen("editClass", { classData: cls })}
          className="gap-2 focus:bg-secondary focus:text-white transition-colors cursor-pointer rounded-md m-1"
        >
          <Pencil className="h-4 w-4" />
          Edit Session
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen("deleteClass", { classData: cls })}
          className="text-destructive gap-2 focus:bg-destructive focus:text-white transition-colors cursor-pointer rounded-md m-1"
        >
          <Trash className="h-4 w-4" />
          Cancel Class
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: "title",
    header: "Class Title",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Video className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-foreground">{row.getValue("title")}</span>
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">{row.original.subject || "No Subject"}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "batch_name",
    header: "Batch",
    cell: ({ row }) => <Badge variant="secondary" className="font-bold text-[10px] uppercase tracking-wider">{row.getValue("batch_name")}</Badge>,
  },
  {
    accessorKey: "class_date",
    header: "Schedule",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <Calendar className="h-3 w-3 text-secondary" />
          <span>{row.getValue("class_date")}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold">
          <Clock className="h-3 w-3" />
          <span>{row.original.class_time}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meeting_link",
    header: "Meeting",
    cell: ({ row }) => {
      const link = row.getValue("meeting_link") as string
      if (!link) return <span className="text-xs text-muted-foreground italic">No link</span>
      return (
        <Button 
          variant="link" 
          size="sm" 
          className="h-auto p-0 text-primary font-bold text-xs gap-1 group"
          onClick={() => window.open(link, '_blank')}
        >
          Join Class
          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ClassActions cls={row.original} />,
  },
]

