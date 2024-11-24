import * as React from "react";
import { useState } from 'react';
import { 
  Image, 
  Play, 
  Mail, 
  Bell, 
  Star,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  LayoutTemplate,
  MessageCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ContentTypeSelection = () => {
  // Mock user persona data (this would come from previous screens)
  const userPersona = {
    ageRange: '25-34',
    interests: ['Technology', 'Social Media', 'Mobile Apps'],
    behavior: 'Tech-Savvy'
  };

  const [selectedTypes, setSelectedTypes] = useState([]);

  const contentTypes = [
    {
      id: 'static',
      title: 'Static Ads',
      description: 'Instagram carousels, banner ads, and social media visuals',
      icon: <Image className="w-6 h-6" />,
      color: 'bg-purple-50',
      platforms: [
        'Instagram',
        'Facebook',
        'LinkedIn',
        'Display Network'
      ],
      recommended: false
    },
    {
      id: 'video',
      title: 'Video Content',
      description: 'Short-form videos, YouTube Shorts, Reels, and influencer collaborations',
      icon: <Play className="w-6 h-6" />,
      color: 'bg-red-50',
      platforms: [
        'YouTube',
        'Instagram',
        'TikTok',
        'Facebook'
      ],
      recommended: true
    },
    {
      id: 'email',
      title: 'Email Marketing',
      description: 'Personalized recommendations, reminders, and special offers',
      icon: <Mail className="w-6 h-6" />,
      color: 'bg-blue-50',
      platforms: [
        'Email clients',
        'Mobile inbox',
        'Web browsers'
      ],
      recommended: false
    },
    {
      id: 'notifications',
      title: 'App Notifications',
      description: 'Engaging CTAs for dormant and active users with timely alerts',
      icon: <Bell className="w-6 h-6" />,
      color: 'bg-green-50',
      platforms: [
        'Mobile apps',
        'Web browsers',
        'Desktop notifications'
      ],
      recommended: false
    },
    {
      id: 'inapp',
      title: 'In-App Banners',
      description: 'Strategic in-app placements for announcements and promotions',
      icon: <LayoutTemplate className="w-6 h-6" />,
      color: 'bg-yellow-50',
      platforms: [
        'Mobile app',
        'Web app',
        'Desktop app'
      ],
      recommended: true
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Campaigns',
      description: 'Direct messaging campaigns for personalized engagement',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-emerald-50',
      platforms: [
        'WhatsApp Business',
        'WhatsApp API'
      ],
      recommended: false
    }
  ];

  const toggleContentType = (typeId) => {
    setSelectedTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Select Content Types</CardTitle>
                <CardDescription>
                  Choose the types of content you want to create for your campaigns
                </CardDescription>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Personalized Recommendations
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Based on your target audience and objectives</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => toggleContentType(type.id)}
                  className={`w-full p-6 rounded-xl border-2 transition-all relative ${
                    selectedTypes.includes(type.id)
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-blue-300'
                  } ${type.color}`}
                >
                  {type.recommended && (
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Recommended
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      selectedTypes.includes(type.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-600'
                    }`}>
                      {type.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{type.title}</h3>
                        {selectedTypes.includes(type.id) && (
                          <Check className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{type.description}</p>

                      {/* Platforms */}
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {type.platforms.map((platform, index) => (
                            <Badge 
                              key={index}
                              variant="secondary"
                              className="bg-white"
                            >
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Channels
            </Button>
            <Button 
              disabled={selectedTypes.length === 0}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Continue to Campaign Setup
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ContentTypeSelection;
