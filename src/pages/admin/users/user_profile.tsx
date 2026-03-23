import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Edit,
  CheckCircle,
  User as UserIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useQuery } from "@tanstack/react-query";
import { getEducationUserById } from "@/api/educationUserApi";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["education-user", id],
    queryFn: () => getEducationUserById(id as string),
    enabled: !!id,
  });

  const user = data?.user || data; 

  if (isLoading) return <div className="p-8 text-center">Loading user details...</div>;
  if (error || !user) return <div className="p-8 text-center text-destructive">Error: User not found</div>;

  const userData = {
    id: user.id || user._id,
    name: user.name,
    email: user.email,
    phone: user.mobile || user.phone || "N/A",
    status: user.status || "active",
    joined: user.createdAt?.split("T")[0] || "N/A",
    role: user.role || "student",
    profileImg: user.profile_picture || user.avatar,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/users")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">User Details</h2>
          <p className="text-muted-foreground text-sm">User ID: {userData.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              Profile
              <Badge variant={userData.status === "active" ? "default" : "destructive"}>
                {userData.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center border-2 border-muted mb-4">
                {userData.profileImg ? (
                  <img src={userData.profileImg} alt={userData.name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-12 h-12 text-muted-foreground" />
                )}
              </div>
              <h3 className="text-xl font-semibold">{userData.name}</h3>
              <div className="flex items-center gap-1 text-primary text-sm mt-1 uppercase font-bold">
                <CheckCircle className="h-4 w-4" />
                {userData.role}
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined on {userData.joined}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Activity Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="batches">Enrolled Batches</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground font-medium mb-1">Account Role</p>
                    <p className="text-lg font-bold capitalize">{userData.role}</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground font-medium mb-1">Status</p>
                    <p className="text-lg font-bold capitalize">{userData.status}</p>
                  </div>
                </div>
                <div>
                   <h4 className="font-semibold mb-2">Internal Note</h4>
                   <p className="text-sm text-muted-foreground p-3 border rounded">
                     No internal notes for this user.
                   </p>
                </div>
              </TabsContent>
              <TabsContent value="batches" className="pt-4">
                 <div className="text-center py-8 text-muted-foreground">
                   Batch enrollment data will appear here once connected.
                 </div>
              </TabsContent>
              <TabsContent value="activity" className="pt-4">
                 <div className="text-center py-8 text-muted-foreground">
                   No recent activity recorded.
                 </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetail;
