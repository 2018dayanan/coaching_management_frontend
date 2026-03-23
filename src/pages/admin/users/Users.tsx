import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Filter, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllEducationUsers } from "@/api/educationUserApi";
import { columns, type User } from "@/components/data_tables/users/columns";
import { DataTable } from "@/components/DataTable";
import { useMemo } from "react";
import { useModal } from "@/hooks/use-model-store";

const Users = () => {
  const { onOpen } = useModal();

  const { data, isLoading, error } = useQuery({
    queryKey: ["education-users"],
    queryFn: () => getAllEducationUsers(),
  });

  // Assuming the new API returns { status: true, users: [...] } or just [...]
  // Mapping based on the educationUserApi.ts types
  const usersData = Array.isArray(data) ? data : data?.users || [];

  const userTableData: User[] = usersData.map((user: any) => ({
    id: user.id || user._id,
    profileImg: user.profile_picture || user.avatar,
    name: user.name,
    phone: user.mobile || user.phone || "N/A",
    bookings: 0,
    joined: user.createdAt || new Date().toISOString(),
    status: user.status || "active",
    email: user.email,
  }));

  const activeUserCount = useMemo(() => {
    return userTableData.filter(
      (user) => user.status?.toLowerCase() === "active"
    ).length;
  }, [userTableData]);

  if (isLoading) return <div className="flex justify-center p-8"><div>Loading users...</div></div>;
  if (error) return <div className="flex justify-center p-8 text-destructive"><div>Error loading users</div></div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground mt-1">
            Manage and monitor all students and teachers
          </p>
        </div>
        <Button
          onClick={() => onOpen("addUser", {})}
          className="gap-2 cursor-pointer active:bg-blue-900 w-full md:w-auto"
        >
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userTableData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUserCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userTableData.length - activeUserCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* User Directory */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <CardTitle>User Directory</CardTitle>
              <CardDescription>Search and manage user accounts</CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block overflow-x-auto">
            <DataTable columns={columns as any} data={userTableData} />
          </div>

          <div className="md:hidden flex flex-col gap-3">
            {userTableData.map((user) => (
              <div
                key={user.id}
                className="border rounded-lg p-3 shadow-sm bg-background space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{user.name}</span>
                  <Badge
                    variant={
                      user.status === "active" ? "default" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Phone: {user.phone}</div>
                  <div>Email: {user.email}</div>
                  <div>Joined: {new Date(user.joined).toLocaleDateString()}</div>
                </div>
                <Button variant="ghost" size="sm" className="w-full">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
