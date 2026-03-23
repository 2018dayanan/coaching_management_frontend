import { useQuery } from "@tanstack/react-query";
import { getAdminProfile, type AdminProfile } from "@/api/educationAuthApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Mail,
  Phone,
  User,
  CalendarDays,
  Clock,
  AtSign,
  Copy,
  CheckCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AdminProfilePage = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const { data: profile, isLoading, error } = useQuery<AdminProfile>({
    queryKey: ["admin-profile"],
    queryFn: getAdminProfile,
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (error) {
    return (
      <div className="flex justify-center p-12 text-destructive">
        Failed to load profile. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Admin Profile
        </h2>
        <p className="text-muted-foreground mt-1">
          Your administrator account details and credentials.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
          <div className="text-xs font-bold text-muted-foreground animate-pulse uppercase tracking-widest">
            Loading Profile...
          </div>
        </div>
      ) : profile ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card — Left */}
          <Card className="lg:col-span-1 border-border/50 bg-background/80 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10" />
            <CardContent className="pt-16 flex flex-col items-center text-center relative z-10">
              {/* Avatar */}
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary grid place-content-center text-white text-3xl font-black shadow-xl shadow-primary/20 ring-4 ring-background">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <h3 className="text-xl font-bold mt-4">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">@{profile.username}</p>
              <Badge
                className="mt-3 font-black text-[10px] uppercase tracking-widest px-3 py-1 bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20"
              >
                <Shield className="h-3 w-3 mr-1.5" />
                {profile.role.replace("_", " ")}
              </Badge>

              <div className="w-full border-t border-border/50 mt-6 pt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">
                      Member Since
                    </p>
                    <p className="text-xs font-medium truncate">
                      {formatDate(profile.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">
                      Last Updated
                    </p>
                    <p className="text-xs font-medium truncate">
                      {formatDate(profile.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detail Cards — Right */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-border/50 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-4 border-b border-border/50">
                <CardTitle className="text-lg font-bold">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                {/* Name */}
                <ProfileField
                  icon={<User className="h-4 w-4" />}
                  label="Full Name"
                  value={profile.name}
                  onCopy={() => copyToClipboard(profile.name, "Name")}
                  isCopied={copied === "Name"}
                />
                {/* Username */}
                <ProfileField
                  icon={<AtSign className="h-4 w-4" />}
                  label="Username"
                  value={profile.username}
                  onCopy={() => copyToClipboard(profile.username, "Username")}
                  isCopied={copied === "Username"}
                />
                {/* Email */}
                <ProfileField
                  icon={<Mail className="h-4 w-4" />}
                  label="Email Address"
                  value={profile.email}
                  onCopy={() => copyToClipboard(profile.email, "Email")}
                  isCopied={copied === "Email"}
                />
                {/* Phone */}
                <ProfileField
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone Number"
                  value={String(profile.phone)}
                  onCopy={() => copyToClipboard(String(profile.phone), "Phone")}
                  isCopied={copied === "Phone"}
                />
                {/* Role */}
                <ProfileField
                  icon={<Shield className="h-4 w-4" />}
                  label="Access Role"
                  value={profile.role.replace("_", " ")}
                  badge
                />
                {/* Account ID */}
                <ProfileField
                  icon={<User className="h-4 w-4" />}
                  label="Account ID"
                  value={profile._id}
                  mono
                  onCopy={() => copyToClipboard(profile._id, "ID")}
                  isCopied={copied === "ID"}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : null}
    </div>
  );
};

/* ─── Reusable Field Row ─── */

type ProfileFieldProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
  badge?: boolean;
  onCopy?: () => void;
  isCopied?: boolean;
};

const ProfileField = ({ icon, label, value, mono, badge, onCopy, isCopied }: ProfileFieldProps) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-3 min-w-0">
      <div className="h-8 w-8 rounded-lg bg-muted/30 grid place-content-center text-muted-foreground shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-70">
          {label}
        </p>
        {badge ? (
          <Badge className="mt-0.5 text-[10px] font-black uppercase tracking-widest bg-secondary/10 text-secondary border-secondary/20">
            {value}
          </Badge>
        ) : (
          <p className={`text-sm font-semibold truncate ${mono ? "font-mono text-xs opacity-60" : ""}`}>
            {value}
          </p>
        )}
      </div>
    </div>
    {onCopy && (
      <button
        onClick={onCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-muted/40"
        title={`Copy ${label}`}
      >
        {isCopied ? (
          <CheckCheck className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <Copy className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </button>
    )}
  </div>
);

export default AdminProfilePage;
