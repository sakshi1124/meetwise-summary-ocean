import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Calendar, FileText, Download, Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  profilePicture?: string;
  joinDate: string;
  meetingsCount: number;
  totalMinutes: number;
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: number;
  status: 'processed' | 'pending';
}

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    joinDate: '2024-01-01',
    meetingsCount: 12,
    totalMinutes: 450,
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const [recentMeetings, setRecentMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Replace with actual API calls
        // const profileResponse = await fetch('/api/user/profile');
        // const meetingsResponse = await fetch('/api/user/meetings');
        
        // Mock data - remove when backend is connected
        const mockMeetings: Meeting[] = [
          {
            id: '1',
            title: 'Team Standup Meeting',
            date: '2024-01-15',
            duration: 30,
            status: 'processed'
          },
          {
            id: '2',
            title: 'Client Strategy Session',
            date: '2024-01-14',
            duration: 60,
            status: 'processed'
          },
          {
            id: '3',
            title: 'Product Planning',
            date: '2024-01-13',
            duration: 45,
            status: 'pending'
          }
        ];

        setRecentMeetings(mockMeetings);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedProfile(profile);
    }
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    
    try {
      // Replace with actual API call
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editedProfile)
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(editedProfile);
      setIsEditing(false);
      
      toast({
        title: "Profile updated!",
        description: "Your profile changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded-lg w-48"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="h-96 bg-muted rounded-lg"></div>
              <div className="lg:col-span-2 h-96 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gradient">
            My Profile
          </h1>
          <Button
            onClick={isEditing ? handleEditToggle : handleEditToggle}
            variant={isEditing ? "outline" : "default"}
            className={isEditing ? "hover:bg-destructive/10" : "ocean-gradient hover:shadow-hover"}
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="animate-slide-up">
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage 
                      src={profile.profilePicture} 
                      alt={profile.name}
                    />
                    <AvatarFallback className="text-xl bg-primary/20 text-primary">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-sm text-muted-foreground">
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={editedProfile.name}
                          onChange={handleInputChange}
                          className="text-center"
                        />
                      </div>
                      <div>
                        <Label htmlFor="username" className="text-sm text-muted-foreground">
                          Username
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          value={editedProfile.username}
                          onChange={handleInputChange}
                          className="text-center"
                        />
                      </div>
                      <Button 
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                        className="w-full ocean-gradient"
                      >
                        {isSaving ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </div>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-1">
                        {profile.name}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        @{profile.username}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 mt-6">
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{profile.email}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        Joined {new Date(profile.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {profile.meetingsCount}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Meetings
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {Math.round(profile.totalMinutes / 60)}h
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Time
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {/* Recent Meetings */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <FileText className="w-5 h-5 mr-3 text-primary" />
                  Recent Meetings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentMeetings.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No meetings yet</p>
                    <Link to="/meeting/new">
                      <Button className="mt-4 ocean-gradient">
                        Upload Your First Meeting
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentMeetings.map((meeting) => (
                      <div key={meeting.id} className="flex items-center justify-between p-4 rounded-lg border border-border/20 hover:bg-muted/20 transition-colors">
                        <div className="flex-1">
                          <Link 
                            to={`/meeting/${meeting.id}`}
                            className="font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {meeting.title}
                          </Link>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                            <span>{new Date(meeting.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{meeting.duration} minutes</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={meeting.status === 'processed' ? 'default' : 'secondary'}
                            className={meeting.status === 'processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                          >
                            {meeting.status}
                          </Badge>
                          {meeting.status === 'processed' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-primary/10"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <User className="w-5 h-5 mr-3 text-primary" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Manage how you receive notifications about your meetings and summaries.
                    </p>
                    <Button variant="outline" className="hover:bg-primary/10">
                      Configure Notifications
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-foreground mb-2">Data Export</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Download all your meeting data and summaries.
                    </p>
                    <Button variant="outline" className="hover:bg-primary/10">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium text-destructive mb-2">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permanently delete your account and all associated data.
                    </p>
                    <Button variant="destructive" className="hover:shadow-hover">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;