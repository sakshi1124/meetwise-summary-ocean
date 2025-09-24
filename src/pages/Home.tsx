import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar, Clock, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  status: 'processed' | 'pending' | 'uploaded';
}

const Home = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch meetings from backend API
    const fetchMeetings = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/meetings');
        // const data = await response.json();
        // setMeetings(data);
        
        // Start with empty meetings array - users will add their own
        setMeetings([]);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'uploaded':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded-lg w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gradient mb-6">
            MeetWise
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your meeting recordings into actionable insights. Upload, process, and 
            get intelligent summaries with key action items and important dates.
          </p>
          <Link to="/meeting/new">
            <Button className="mt-8 ocean-gradient hover:shadow-hover text-lg px-8 py-3">
              <Plus className="w-5 h-5 mr-2" />
              Upload New Meeting
            </Button>
          </Link>
        </div>

        {/* Dashboard Section */}
        <div className="animate-slide-up">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Your Dashboard</h2>
            <Link to="/meeting/new">
              <Button variant="outline" className="hover:bg-primary/10">
                <Plus className="w-4 h-4 mr-2" />
                New Meeting
              </Button>
            </Link>
          </div>

          {/* Meetings Grid */}
          {meetings.length === 0 ? (
            <Card className="glass-card text-center py-12 animate-scale-in">
              <CardContent>
                <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No meetings yet</h3>
                <p className="text-muted-foreground mb-6">
                  Upload your first meeting recording to get started with AI-powered summaries.
                </p>
                <Link to="/meeting/new">
                  <Button className="ocean-gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Your First Meeting
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meetings.map((meeting, index) => (
                <Link key={meeting.id} to={`/meeting/${meeting.id}`}>
                  <Card 
                    className="meeting-card animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-foreground">
                          {meeting.title}
                        </CardTitle>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                          {meeting.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(meeting.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Clock className="w-4 h-4 mr-2" />
                          {meeting.time}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;