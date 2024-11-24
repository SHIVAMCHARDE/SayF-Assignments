import * as React from  'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles,
  Settings,
  ArrowRight,
  FileText,
  TrendingUp,
  Menu,
  Bell,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dashboard = () => {

  const pastCampaigns = [
    {
      id: 1,
      name: "Summer Product Launch",
      type: "WhatsApp + Push",
      performance: "92%",
      trend: "+12%",
      status: "Completed"
    },
    {
      id: 2,
      name: "Flash Sale Campaign",
      type: "Push Notification",
      performance: "88%",
      trend: "+8%",
      status: "Completed"
    },
    {
      id: 3,
      name: "New Feature Announcement",
      type: "In-App Banner",
      performance: "85%",
      trend: "+15%",
      status: "Completed"
    }
  ];

  const navigate = useNavigate()

  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))


  useEffect(() => {
    console.log(profile)
    if(profile === null) navigate('/login')
  }, [profile])


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  Marketing Planner
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{profile && profile.given_name}</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium overflow-hidden">
                  {
                    profile && <img src={profile.picture} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">Good morning, John</h2>
          <p className="text-gray-500 mt-1">Ready to create your next successful campaign?</p>
        </div>

        <Card className="border-none bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden mb-8">
          <CardContent className="p-10">
            <div className="max-w-4xl">
              <div className="mb-6">
                <div className="inline-flex gap-2 bg-white/50 p-1 rounded-lg">
                  <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI-Powered
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700 px-3 py-1">
                    New Features
                  </Badge>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Create Your Marketing Campaign
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl">
                    Let our AI analyze your brand and create optimized marketing strategies
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Brand Voice Analysis", "Smart Content", "Multi-Channel", "Performance Tracking"].map((feature, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/60 rounded-full text-sm text-gray-600 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                      {feature}
                    </span>
                  ))}
                </div>

                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-auto p-4 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                  onClick={()=>navigate('/marketing')}
                >
                  <span className="flex items-center text-base font-medium">
                    <Sparkles className="w-4 h-4 mr-2"   />
                    Start Creating Marketing Plan
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Previous Campaigns</h3>
              <p className="text-sm text-gray-500">Performance from your recent campaigns</p>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pastCampaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-white hover:border-blue-100 transition-colors">
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-900 mb-1">{campaign.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{campaign.type}</span>
                      <Badge variant="secondary" className="bg-green-50 text-green-700">
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t">
                    <div className="text-2xl font-semibold text-gray-900">
                      {campaign.performance}
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {campaign.trend}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
