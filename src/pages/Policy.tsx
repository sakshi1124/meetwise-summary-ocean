import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Lock, FileText, Users, Clock } from "lucide-react";

const Policy = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Privacy Policy & Terms
          </h1>
          <p className="text-xl text-muted-foreground">
            Your privacy and trust matter to us. Here's how we protect your data and meetings.
          </p>
        </div>

        <div className="space-y-8">
          {/* Privacy Policy */}
          <Card className="glass-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-foreground">
                <Shield className="w-6 h-6 mr-3 text-primary" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-accent" />
                  Information We Collect
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We collect only the information necessary to provide our meeting summary services:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1 ml-4">
                  <li>Meeting recordings you upload (audio/video files)</li>
                  <li>Account information (name, email address)</li>
                  <li>Meeting metadata (titles, dates, participant information)</li>
                  <li>Usage analytics to improve our service</li>
                </ul>
              </div>

              <Separator className="bg-border/50" />

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-accent" />
                  How We Protect Your Data
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>End-to-end encryption for all uploaded files</li>
                  <li>Secure cloud storage with industry-standard protection</li>
                  <li>Regular security audits and compliance checks</li>
                  <li>Access controls and authentication measures</li>
                  <li>Automatic deletion of processed files after 90 days</li>
                </ul>
              </div>

              <Separator className="bg-border/50" />

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-accent" />
                  Data Usage & Sharing
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We never share your meeting content with third parties. Your recordings are processed 
                  using secure AI models, and the generated summaries belong entirely to you. We may 
                  use anonymized data to improve our AI algorithms, but never in a way that could 
                  identify you or your meetings.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Terms of Service */}
          <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-foreground">
                <Users className="w-6 h-6 mr-3 text-primary" />
                Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Acceptable Use
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  By using MeetWise, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1 ml-4">
                  <li>Only upload meetings where you have proper consent from all participants</li>
                  <li>Comply with applicable laws and regulations</li>
                  <li>Not use the service for any illegal or harmful purposes</li>
                  <li>Respect intellectual property rights</li>
                  <li>Maintain the security of your account credentials</li>
                </ul>
              </div>

              <Separator className="bg-border/50" />

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Service Availability
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to maintain 99.9% uptime for MeetWise. However, we may occasionally 
                  need to perform maintenance or updates. We'll provide advance notice for 
                  planned downtime whenever possible.
                </p>
              </div>

              <Separator className="bg-border/50" />

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Content Ownership
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  You retain full ownership of your meeting recordings and generated summaries. 
                  MeetWise does not claim any rights to your content. You may export, download, 
                  or delete your data at any time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="glass-card beach-gradient animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Questions About Our Policies?
                </h3>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about our privacy policy or terms of service, 
                  please don't hesitate to reach out.
                </p>
                <p className="text-sm text-muted-foreground">
                  Last updated: January 2024
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Policy;