import * as React from "react";
import { useState } from 'react';
import { 
  Megaphone, 
  Users, 
  ShoppingCart, 
  UserPlus, 
  ArrowRight, 
  ArrowLeft,
  Check
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
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const StrategySelection = () => {

  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const location = useLocation();
  const { formData } = location.state || {};

  const navigate = useNavigate()

  const strategies = [
    {
      id: 'awareness',
      title: 'Awareness Campaigns',
      description: 'Focus on reaching new audiences through social media and search ads',
      details: [
        'Targeted social media advertising',
        'Search engine marketing',
        'Brand visibility campaigns',
        'New audience acquisition'
      ],
      icon: <Megaphone className="w-6 h-6" />,
      color: 'bg-blue-50'
    },
    {
      id: 'engagement',
      title: 'Engagement Strategy',
      description: 'Target dormant users with push notifications and retargeting campaigns',
      details: [
        'Push notification campaigns',
        'Retargeting inactive users',
        'Personalized messaging',
        'Re-engagement programs'
      ],
      icon: <Users className="w-6 h-6" />,
      color: 'bg-purple-50'
    },
    {
      id: 'crosssell',
      title: 'Cross-sell/Upsell Strategy',
      description: 'Encourage additional transactions or services for engaged users via personalized content',
      details: [
        'Personalized recommendations',
        'Bundle offerings',
        'Premium feature promotion',
        'Loyalty rewards'
      ],
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-green-50'
    },
    {
      id: 'influencer',
      title: 'Influencer Partnerships',
      description: 'Build credibility and social proof with influencers',
      details: [
        'Influencer collaborations',
        'Social proof building',
        'Brand authenticity',
        'Community engagement'
      ],
      icon: <UserPlus className="w-6 h-6" />,
      color: 'bg-orange-50'
    }
  ];

  const toggleStrategy = (strategyId) => {
    setSelectedStrategies(prev => 
      prev.includes(strategyId)
        ? prev.filter(id => id !== strategyId)
        : [...prev, strategyId]
    );
  };

  const goToChannels =()=>{

    let strategyData = strategies
    .filter(strategy => selectedStrategies.includes(strategy.id)) 
    .map(strategy => {
      const { icon, ...rest } = strategy; 
      return rest; 
    });

    const newFormData = {...formData, strategy: strategyData}
    navigate('/channels', {state:{newFormData}})

  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create Your Marketing Strategy</CardTitle>
            <CardDescription>
              Select the strategies that align with your objectives and target audience
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {strategies.map((strategy) => (
                <button
                  key={strategy.id}
                  onClick={() => toggleStrategy(strategy.id)}
                  className={`w-full p-6 rounded-xl border-2 transition-all ${
                    selectedStrategies.includes(strategy.id)
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-blue-300'
                  } ${strategy.color}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      selectedStrategies.includes(strategy.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-600'
                    }`}>
                      {strategy.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{strategy.title}</h3>
                        {selectedStrategies.includes(strategy.id) && (
                          <Check className="w-6 h-6 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{strategy.description}</p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {strategy.details.map((detail, index) => (
                          <div 
                            key={index}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline"
               onClick={()=>navigate('/marketing')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Persona
            </Button>
            <Button 
              disabled={selectedStrategies.length === 0}
              className="bg-blue-500 hover:bg-blue-600"
              onClick={goToChannels}
            >
              Continue to Channels
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default StrategySelection;
