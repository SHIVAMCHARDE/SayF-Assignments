import * as React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Download, 
  Users, 
  Megaphone,
  TrendingUp,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Briefcase,
  Heart,
  Tags
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MarketingFlow = () => {
  const [currentStep, setCurrentStep] = useState('objectives');
  const [formData, setFormData] = useState({
    objectives: {
      primary: null,
      secondary: null
    },
    persona: {
      name: '',
      gender: '',
      ageRange: '',
      occupation: '',
      location: '',
      interests: []
    }
  });

  const navigate = useNavigate()

  const ObjectivesScreen = () => {
    const primaryObjectives = [
      {
        id: 'downloads',
        title: 'Increase App Downloads',
        description: 'Focus on new user acquisition and registrations',
        icon: <Download className="w-6 h-6" />,
        color: 'bg-blue-50 border-blue-200'
      },
      {
        id: 'engagement',
        title: 'Drive User Engagement',
        description: 'Boost transactions for existing and new users',
        icon: <Users className="w-6 h-6" />,
        color: 'bg-purple-50 border-purple-200'
      },
      {
        id: 'awareness',
        title: 'Boost Brand Awareness',
        description: 'Increase visibility in target audience',
        icon: <Megaphone className="w-6 h-6" />,
        color: 'bg-green-50 border-green-200'
      }
    ];

    const secondaryObjectives = [
      {
        id: 'retention',
        title: 'Improve Retention Rates',
        description: 'Focus on user retention and loyalty',
        icon: <TrendingUp className="w-6 h-6" />,
        color: 'bg-orange-50 border-orange-200'
      },
      {
        id: 'roi',
        title: 'Optimize Marketing ROI',
        description: 'Maximize return on marketing spend',
        icon: <DollarSign className="w-6 h-6" />,
        color: 'bg-pink-50 border-pink-200'
      }
    ];

    const handleSelect = (type, objective) => {
      setFormData(prev => ({
        ...prev,
        objectives: {
          ...prev.objectives,
          [type]: prev.objectives[type] === objective.id ? null : objective.id
        }
      }));
    };

    return (
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Define Your Marketing Objectives</CardTitle>
          <CardDescription>
            Select one primary and one secondary objective to get started
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Primary Objectives */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Primary Objective</h3>
            <div className="grid grid-cols-1 gap-4">
              {primaryObjectives.map((objective) => (
                <button
                  key={objective.id}
                  onClick={() => handleSelect('primary', objective)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.objectives.primary === objective.id
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-transparent hover:border-gray-200'
                  } ${objective.color}`}
                >
                  <div className="flex items-center space-x-4">
                    {objective.icon}
                    <div className="flex-1 text-left">
                      <h4 className="font-medium">{objective.title}</h4>
                      <p className="text-sm text-gray-600">{objective.description}</p>
                    </div>
                    {formData.objectives.primary === objective.id && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Objectives */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Secondary Objective</h3>
            <div className="grid grid-cols-1 gap-4">
              {secondaryObjectives.map((objective) => (
                <button
                  key={objective.id}
                  onClick={() => handleSelect('secondary', objective)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.objectives.secondary === objective.id
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-transparent hover:border-gray-200'
                  } ${objective.color}`}
                >
                  <div className="flex items-center space-x-4">
                    {objective.icon}
                    <div className="flex-1 text-left">
                      <h4 className="font-medium">{objective.title}</h4>
                      <p className="text-sm text-gray-600">{objective.description}</p>
                    </div>
                    {formData.objectives.secondary === objective.id && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button 
            size="lg"
            disabled={!formData.objectives.primary || !formData.objectives.secondary}
            className="space-x-2"
            onClick={() => setCurrentStep('persona')}
          >
            <span>Continue to Target Audience</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const UserPersonaScreen = () => {
    const [currentInterest, setCurrentInterest] = useState('');

    const addInterest = () => {
      if (currentInterest.trim() && !formData.persona.interests.includes(currentInterest.trim())) {
        setFormData(prev => ({
          ...prev,
          persona: {
            ...prev.persona,
            interests: [...prev.persona.interests, currentInterest.trim()]
          }
        }));
        setCurrentInterest('');
      }
    };

    const removeInterest = (interest) => {
      setFormData(prev => ({
        ...prev,
        persona: {
          ...prev.persona,
          interests: prev.persona.interests.filter(i => i !== interest)
        }
      }));
    };

    const handlePersonaChange = (field, value) => {
      setFormData(prev => ({
        ...prev,
        persona: {
          ...prev.persona,
          [field]: value
        }
      }));
    };

    const isFormValid = () => {
      return formData.persona.name && formData.persona.gender && 
             formData.persona.ageRange && formData.persona.occupation;
    };

    return (
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Define Your Target Audience</CardTitle>
          <CardDescription>
            Create a detailed profile of your ideal customer segment
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Persona Name</label>
              <div className="relative">
                <Users className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <Input 
                  className="pl-10"
                  placeholder="e.g., Tech-Savvy Professional"
                  value={formData.persona.name}
                  onChange={(e) => handlePersonaChange('name', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <Select
                value={formData.persona.gender}
                onValueChange={(value) => handlePersonaChange('gender', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="all">All Genders</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Age Range</label>
              <Select
                value={formData.persona.ageRange}
                onValueChange={(value) => handlePersonaChange('ageRange', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-24">18-24 years</SelectItem>
                  <SelectItem value="25-34">25-34 years</SelectItem>
                  <SelectItem value="35-44">35-44 years</SelectItem>
                  <SelectItem value="45-54">45-54 years</SelectItem>
                  <SelectItem value="55+">55+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <Input 
                  className="pl-10"
                  placeholder="e.g., Urban Areas, Specific Cities"
                  value={formData.persona.location}
                  onChange={(e) => handlePersonaChange('location', e.target.value)}
                />
              </div>
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Occupation/Industry</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <Input 
                  className="pl-10"
                  placeholder="e.g., Software Developer, Healthcare Professional"
                  value={formData.persona.occupation}
                  onChange={(e) => handlePersonaChange('occupation', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">Interests & Behaviors</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Heart className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <Input 
                  className="pl-10"
                  placeholder="Add interests (e.g., Technology, Fitness)"
                  value={currentInterest}
                  onChange={(e) => setCurrentInterest(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addInterest();
                    }
                  }}
                />
              </div>
              <Button 
                variant="outline"
                onClick={addInterest}
              >
                Add
              </Button>
            </div>
            
            {formData.persona.interests.length > 0 && (
              <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
                {formData.persona.interests.map((interest, index) => (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-1"
                  >
                    <Tags className="w-3 h-3" />
                    {interest}
                    <button
                      onClick={() => removeInterest(interest)}
                      className="ml-2 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => setCurrentStep('objectives')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Objectives
          </Button>
          <Button 
            size="lg"
            disabled={!isFormValid()}
            className="space-x-2"
            onClick={() => navigate('/strategy', { state: { formData } }) }
          >
            <span>Continue to Strategy</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
      {currentStep === 'objectives' ? <ObjectivesScreen /> : <UserPersonaScreen />}
    </div>
  );
};

export default MarketingFlow;
