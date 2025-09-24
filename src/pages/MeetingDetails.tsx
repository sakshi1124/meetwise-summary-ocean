import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  FileAudio, 
  FileVideo, 
  Download, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MeetingSummary {
  summary: string;
  actionItems: string[];
  importantDates: string[];
  participants: string[];
  duration: number;
  keyTopics: string[];
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  status: 'uploaded' | 'processing' | 'processed' | 'error';
  fileName?: string;
  fileSize?: number;
  summary?: MeetingSummary;
}

const MeetingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch(`/api/meetings/${id}`);
        // const data = await response.json();
        
        // Mock data based on ID
        if (id === 'new') {
          setMeeting({
            id: 'new',
            title: '',
            date: new Date().toISOString().split('T')[0],
            time: new Date().toTimeString().slice(0, 5),
            status: 'uploaded'
          });
          setMeetingTitle('');
        } else {
          // Mock existing meeting data
          const mockMeeting: Meeting = {
            id: id || '1',
            title: 'Team Standup Meeting',
            date: '2024-01-15',
            time: '09:00',
            status: 'processed',
            fileName: 'team-standup-jan15.mp4',
            fileSize: 45000000, // 45MB
            summary: {
              summary: 'The team discussed current sprint progress, identified blockers in the authentication module, and planned the upcoming feature releases. Key decisions were made regarding the API restructuring and timeline adjustments for Q1 deliverables.',
              actionItems: [
                'John to fix authentication bug by Friday',
                'Sarah to review API documentation by Wednesday',
                'Team to attend architecture review meeting next Tuesday',
                'Update project timeline based on current progress'
              ],
              importantDates: [
                'January 20, 2024 - Authentication module deadline',
                'January 25, 2024 - Architecture review meeting',
                'February 1, 2024 - Q1 milestone review'
              ],
              participants: ['John Doe', 'Sarah Smith', 'Mike Johnson', 'Emily Brown'],
              duration: 30,
              keyTopics: ['Sprint Progress', 'Authentication Issues', 'API Design', 'Timeline Planning']
            }
          };
          setMeeting(mockMeeting);
          setMeetingTitle(mockMeeting.title);
        }
      } catch (error) {
        console.error('Error fetching meeting:', error);
        toast({
          title: "Error loading meeting",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [id, toast]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type (audio/video)
      const allowedTypes = ['audio/', 'video/'];
      const isValidType = allowedTypes.some(type => file.type.startsWith(type));
      
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: "Please select an audio or video file.",
          variant: "destructive",
        });
        return;
      }

      // Check file size (max 500MB)
      if (file.size > 500 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 500MB.",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      if (!meetingTitle) {
        setMeetingTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !meetingTitle.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a meeting title and select a file.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 200);

      // Replace with actual API call
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // formData.append('title', meetingTitle);
      // formData.append('date', meeting?.date || '');
      // formData.append('time', meeting?.time || '');
      
      // const response = await fetch('/api/meetings/upload', {
      //   method: 'POST',
      //   body: formData
      // });

      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      toast({
        title: "Upload successful!",
        description: "Your meeting is being processed. You'll receive a notification when the summary is ready.",
      });

      // Update meeting status
      if (meeting) {
        setMeeting({
          ...meeting,
          title: meetingTitle,
          status: 'processing',
          fileName: selectedFile.name,
          fileSize: selectedFile.size
        });
      }

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const downloadSummary = () => {
    // Replace with actual PDF generation
    toast({
      title: "Download started",
      description: "Your meeting summary PDF is being prepared.",
    });
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded-lg w-64"></div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <Card className="glass-card max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <AlertCircle className="w-16 h-16 mx-auto text-destructive mb-4" />
            <h2 className="text-xl font-semibold mb-2">Meeting Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The meeting you're looking for doesn't exist or has been deleted.
            </p>
            <Button onClick={() => navigate('/')} className="ocean-gradient">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isNewMeeting = id === 'new';
  const canUpload = meeting.status === 'uploaded' || isNewMeeting;
  const isProcessed = meeting.status === 'processed' && meeting.summary;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8 animate-fade-in">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mr-4 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gradient">
            {isNewMeeting ? 'Upload New Meeting' : meeting.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {canUpload && (
              <Card className="glass-card animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Upload className="w-5 h-5 mr-3 text-primary" />
                    {isNewMeeting ? 'Upload Meeting Recording' : 'Upload New File'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Meeting Title */}
                  <div>
                    <Label htmlFor="title" className="text-foreground font-medium">
                      Meeting Title
                    </Label>
                    <Input
                      id="title"
                      value={meetingTitle}
                      onChange={(e) => setMeetingTitle(e.target.value)}
                      placeholder="Enter meeting title..."
                      className="mt-2 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <Label className="text-foreground font-medium">
                      Audio/Video File
                    </Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      {selectedFile ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-center">
                            {selectedFile.type.startsWith('audio/') ? (
                              <FileAudio className="w-12 h-12 text-primary" />
                            ) : (
                              <FileVideo className="w-12 h-12 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatFileSize(selectedFile.size)}
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            onClick={() => setSelectedFile(null)}
                            className="hover:bg-destructive/10"
                          >
                            Remove File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                          <div>
                            <p className="text-foreground font-medium">
                              Drop your file here or click to browse
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Supports MP4, MP3, WAV, M4A files up to 500MB
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="audio/*,video/*"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="file-upload"
                          />
                          <Button
                            variant="outline"
                            onClick={() => document.getElementById('file-upload')?.click()}
                            className="hover:bg-primary/10"
                          >
                            Choose File
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground">Uploading...</span>
                        <span className="text-muted-foreground">{Math.round(uploadProgress)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Upload Button */}
                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || !meetingTitle.trim() || isUploading}
                    className="w-full ocean-gradient hover:shadow-hover"
                  >
                    {isUploading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Uploading & Processing...
                      </div>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Meeting
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Summary Report */}
            {isProcessed && (
              <Card className="glass-card animate-slide-up">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-foreground">
                      <FileText className="w-5 h-5 mr-3 text-primary" />
                      Meeting Summary
                    </CardTitle>
                    <Button
                      onClick={downloadSummary}
                      variant="outline"
                      className="hover:bg-primary/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Main Summary */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Summary</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {meeting.summary.summary}
                    </p>
                  </div>

                  <Separator />

                  {/* Action Items */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Action Items</h3>
                    <div className="space-y-2">
                      {meeting.summary.actionItems.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Important Dates */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Important Dates</h3>
                    <div className="space-y-2">
                      {meeting.summary.importantDates.map((date, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-accent/10">
                          <Calendar className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Key Topics */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Key Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {meeting.summary.keyTopics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Meeting Info Sidebar */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-foreground">Meeting Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status */}
                <div>
                  <Label className="text-muted-foreground text-sm">Status</Label>
                  <div className="mt-1">
                    <Badge 
                      variant={meeting.status === 'processed' ? 'default' : 'secondary'}
                      className={
                        meeting.status === 'processed' ? 'bg-green-100 text-green-800' :
                        meeting.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        meeting.status === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {meeting.status === 'processed' ? 'Completed' :
                       meeting.status === 'processing' ? 'Processing' :
                       meeting.status === 'error' ? 'Error' : 'Pending'}
                    </Badge>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="space-y-3">
                  <div>
                    <Label className="text-muted-foreground text-sm">Date</Label>
                    <div className="flex items-center mt-1">
                      <Calendar className="w-4 h-4 text-primary mr-2" />
                      <span className="text-foreground">
                        {new Date(meeting.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground text-sm">Time</Label>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 text-primary mr-2" />
                      <span className="text-foreground">{meeting.time}</span>
                    </div>
                  </div>
                </div>

                {/* File Info */}
                {meeting.fileName && (
                  <div>
                    <Label className="text-muted-foreground text-sm">File</Label>
                    <div className="mt-1">
                      <p className="text-foreground text-sm font-medium">{meeting.fileName}</p>
                      {meeting.fileSize && (
                        <p className="text-muted-foreground text-xs">
                          {formatFileSize(meeting.fileSize)}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Participants */}
                {meeting.summary?.participants && (
                  <div>
                    <Label className="text-muted-foreground text-sm">Participants</Label>
                    <div className="mt-1 space-y-1">
                      {meeting.summary.participants.map((participant, index) => (
                        <div key={index} className="flex items-center">
                          <Users className="w-3 h-3 text-primary mr-2" />
                          <span className="text-foreground text-sm">{participant}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Duration */}
                {meeting.summary?.duration && (
                  <div>
                    <Label className="text-muted-foreground text-sm">Duration</Label>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 text-primary mr-2" />
                      <span className="text-foreground">{meeting.summary.duration} minutes</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;