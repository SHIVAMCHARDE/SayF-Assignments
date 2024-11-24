import * as React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Share2, 
  Users, 
  Mail, 
  Bell, 
  Building2,
  ArrowRight,
  ArrowLeft,
  Check,
  ExternalLink
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
import Anthropic from '@anthropic-ai/sdk';
import { useLocation } from "react-router-dom";

const ChannelSelection = () => {

  const [selectedChannels, setSelectedChannels] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false)

  const location = useLocation();
  const { newFormData } = location.state || {}

  const navigate = useNavigate()

  const anthropic = new Anthropic({
    apiKey: process.env.API_KEY,
    dangerouslyAllowBrowser:true
  });

  const getResponse = async ()=>{

    console.log("Calling API")
    setIsGenerating(true)

    const content = ` ${JSON.stringify(newFormData)} \n use this data to generate Market Plan`

    const msg = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: [{ role: "user", content}],
    });
    const reply =  msg.content[0]['text']

    navigate('/output', {state:{output:reply}})

  }

  const channels = [
    {
      id: 'search',
      title: 'Search Ads (Google Ads)',
      description: 'Target high-intent users with search, display, and app-install campaigns',
      icon: <Search className="w-6 h-6" />,
      color: 'bg-red-50',
      tools: [
        {
          name: 'Google Ads Manager',
          type: 'primary'
        },
        {
          name: 'SEMRush',
          type: 'analytics'
        },
        {
          name: 'Ahrefs',
          type: 'analytics'
        },
        {
          name: 'SpyFu',
          type: 'research'
        },
        {
          name: 'Adzooma',
          type: 'optimization'
        }
      ],
      activities: [
        'Search campaign management',
        'Display advertising',
        'App install campaigns',
        'Keyword optimization'
      ]
    },
    {
      id: 'social',
      title: 'Social Media Marketing',
      description: 'Performance campaigns on platforms like Facebook, Instagram, and YouTube',
      icon: <Share2 className="w-6 h-6" />,
      color: 'bg-blue-50',
      tools: [
        {
          name: 'Facebook Ad Manager',
          type: 'primary'
        },
        {
          name: 'Hootsuite',
          type: 'management'
        },
        {
          name: 'Buffer',
          type: 'scheduling'
        },
        {
          name: 'Sprout Social',
          type: 'analytics'
        },
        {
          name: 'VidIQ-Youtube',
          type: 'optimization'
        }
      ],
      activities: [
        'Social ad campaigns',
        'Content scheduling',
        'Performance tracking',
        'Community management'
      ]
    },
    {
      id: 'influencer',
      title: 'Influencer Marketing',
      description: 'Collaboration with micro and macro influencers for engaging content',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-purple-50',
      tools: [
        {
          name: 'AspireIQ',
          type: 'discovery'
        },
        {
          name: 'Heepsy',
          type: 'discovery',
          status: 'not used'
        }
      ],
      activities: [
        'Influencer discovery',
        'Campaign management',
        'Performance tracking',
        'Content collaboration'
      ]
    },
    {
      id: 'email',
      title: 'Email Marketing',
      description: 'Personalized campaigns for re-targeting, promotions, and reminders',
      icon: <Mail className="w-6 h-6" />,
      color: 'bg-yellow-50',
      tools: [
        {
          name: 'Brevo',
          type: 'automation'
        },
        {
          name: 'MoEngage',
          type: 'engagement'
        },
        {
          name: 'Mailchimp',
          type: 'primary'
        },
        {
          name: 'HubSpot',
          type: 'crm'
        },
        {
          name: 'Klaviyo',
          type: 'ecommerce'
        },
        {
          name: 'ActiveCampaign',
          type: 'automation'
        }
      ],
      activities: [
        'Email automation',
        'Campaign personalization',
        'A/B testing',
        'Performance analytics'
      ]
    },
    {
      id: 'notifications',
      title: 'App Notifications',
      description: 'Push notifications to onboard, engage, and convert existing users',
      icon: <Bell className="w-6 h-6" />,
      color: 'bg-green-50',
      tools: [
        {
          name: 'CleverTap',
          type: 'engagement'
        },
        {
          name: 'MoEngage',
          type: 'engagement'
        },
        {
          name: 'Firebase Cloud Messaging',
          type: 'delivery'
        },
        {
          name: 'Leanplum',
          type: 'optimization'
        },
        {
          name: 'Braze',
          type: 'engagement'
        }
      ],
      activities: [
        'Push notification campaigns',
        'User segmentation',
        'Behavioral triggers',
        'Engagement tracking'
      ]
    },
    {
      id: 'partnerships',
      title: 'B2B Partnerships',
      description: 'Collaborations with aligned brands or platforms to promote app features',
      icon: <Building2 className="w-6 h-6" />,
      color: 'bg-indigo-50',
      tools: [
        {
          name: 'Custom CRM tools',
          type: 'management'
        }
      ],
      activities: [
        'Partnership development',
        'Campaign collaboration',
        'Performance tracking',
        'Resource sharing'
      ]
    }
  ];

  const toggleChannel = (channelId) => {
    setSelectedChannels(prev => 
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const getToolBadgeColor = (type) => {
    const colors = {
      primary: 'bg-blue-100 text-blue-800',
      analytics: 'bg-purple-100 text-purple-800',
      research: 'bg-green-100 text-green-800',
      optimization: 'bg-yellow-100 text-yellow-800',
      management: 'bg-indigo-100 text-indigo-800',
      scheduling: 'bg-pink-100 text-pink-800',
      discovery: 'bg-orange-100 text-orange-800',
      automation: 'bg-cyan-100 text-cyan-800',
      engagement: 'bg-emerald-100 text-emerald-800',
      delivery: 'bg-violet-100 text-violet-800',
      crm: 'bg-red-100 text-red-800',
      ecommerce: 'bg-teal-100 text-teal-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Select Marketing Channels</CardTitle>
            <CardDescription>
              Choose the channels and tools you'll use to execute your marketing strategy
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => toggleChannel(channel.id)}
                  className={`w-full p-6 rounded-xl border-2 transition-all ${
                    selectedChannels.includes(channel.id)
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-blue-300'
                  } ${channel.color}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      selectedChannels.includes(channel.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-600'
                    }`}>
                      {channel.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{channel.title}</h3>
                        {selectedChannels.includes(channel.id) && (
                          <Check className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{channel.description}</p>
                      
                      {/* Activities */}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {channel.activities.map((activity, index) => (
                          <div 
                            key={index}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2" />
                            {activity}
                          </div>
                        ))}
                      </div>

                      {/* Tools */}
                      <div className="mt-4">
                        <div className="text-sm font-medium text-gray-500 mb-2">Available Tools:</div>
                        <div className="flex flex-wrap gap-2">
                          {channel.tools.map((tool, index) => (
                            <Badge 
                              key={index}
                              variant="secondary"
                              className={`px-2 py-1 flex items-center gap-1 ${
                                tool.status === 'not used' ? 'opacity-50' : ''
                              } ${getToolBadgeColor(tool.type)}`}
                            >
                              {tool.name}
                              {tool.status === 'not used' && (
                                <span className="text-xs text-gray-500">(not used)</span>
                              )}
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
            <Button variant="outline"
              onClick={()=>navigate('/strategy')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Strategy
            </Button>
            <Button 
              disabled={selectedChannels.length === 0}
              className="bg-blue-500 hover:bg-blue-600"
              onClick={getResponse}
            >
              {  
                isGenerating ? "Your Response is Generating..." : "Generate Marketing Plan"
              }
              
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ChannelSelection;
