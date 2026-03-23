import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Layers, LayoutGrid } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllBatches } from "@/api/educationBatchApi";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/DataTable";
import { columns, type Batch } from "@/components/data_tables/batches/columns";
import { useMemo } from "react";
import { useModal } from "@/hooks/use-model-store";

const Batches = () => {
  const { onOpen } = useModal();
  const { data, isLoading, error } = useQuery({
    queryKey: ["education-batches"],
    queryFn: () => getAllBatches(),
  });

  const batchesData = Array.isArray(data) ? data : data?.batches || [];

  const batchTableData: Batch[] = useMemo(() => {
    return batchesData.map((batch: any) => ({
      id: batch._id || batch.id,
      name: batch.name,
      subject: batch.subject,
      teacher_name: batch.teacher?.name || batch.teacher_name || "Assigned",
      start_date: batch.start_date,
      end_date: batch.end_date,
      status: batch.status || "active",
    }));
  }, [batchesData]);

  if (error) {
    return (
      <div className="flex justify-center p-12 text-destructive">
        Error loading batches. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Batch Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Organize and oversee all active coaching learning groups.
          </p>
        </div>
        <Button 
          onClick={() => onOpen("createBatch", {})}
          className="gap-2 bg-secondary hover:bg-secondary/90 transition-all font-bold shadow-lg shadow-secondary/20"
        >
          <Plus className="h-4 w-4" />
          Create New Batch
        </Button>
      </div>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <LayoutGrid className="h-12 w-12 text-primary" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Total Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{batchTableData.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-xl border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Layers className="h-12 w-12 text-emerald-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-emerald-500">
                {batchTableData.filter(b => b.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-xl border-white/5 relative overflow-hidden group">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Batch Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-secondary">
                {Math.round((batchTableData.filter(b => b.status === "completed").length / (batchTableData.length || 1)) * 100)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Database Table */}
      <Card className="border-white/5 bg-card/30 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-white/5">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-0.5">
              <CardTitle className="text-lg font-bold">Group Directory</CardTitle>
              <CardDescription className="text-xs">Database of all learning cohorts</CardDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative w-full md:w-64 group">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Query cohorts..."
                  className="pl-8 h-9 bg-muted/40 border-white/5 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg text-sm"
                />
              </div>
              <Button variant="outline" size="sm" className="gap-2 h-9 border-white/10 hover:bg-muted font-bold">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                <div className="text-xs font-bold text-muted-foreground animate-pulse uppercase tracking-widest">Hydrating Learning Data...</div>
            </div>
          ) : batchTableData.length === 0 ? (
            <div className="text-center py-24 px-4">
              <div className="inline-flex h-12 w-12 rounded-full bg-muted items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-muted-foreground opacity-40 " />
              </div>
              <p className="text-sm font-bold text-foreground">No cohorts found</p>
              <p className="text-xs text-muted-foreground mt-1">Start by creating a new coaching batch.</p>
            </div>
          ) : (
             <div className="min-w-full">
                <DataTable columns={columns} data={batchTableData} />
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Batches;
