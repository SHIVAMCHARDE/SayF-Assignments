import * as React from "react";
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  MessageCircle, 
  ImageIcon,
  LayoutTemplate,
  Upload,
  X,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const ContentUploadScreen = () => {
  const [uploadedFiles, setUploadedFiles] = useState({
    notifications: [],
    whatsapp: [],
    carousels: [],
    banners: []
  });

  const contentTypes = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      description: 'Upload previous notification copies in CSV or TXT format',
      icon: <Bell className="w-6 h-6" />,
      color: 'bg-blue-50',
      accepted: '.csv, .txt',
      placeholder: 'notification_copies.csv',
      recommended: true
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Messages',
      description: 'Upload WhatsApp message templates and campaign copies',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-green-50',
      accepted: '.txt, .csv',
      placeholder: 'whatsapp_templates.txt',
      recommended: true
    },
    {
      id: 'carousels',
      title: 'Social Media Carousels',
      description: 'Upload carousel images to analyze design patterns',
      icon: <ImageIcon className="w-6 h-6" />,
      color: 'bg-purple-50',
      accepted: 'image/*',
      placeholder: 'Select carousel images',
      multiple: true
    },
    {
      id: 'banners',
      title: 'App Banners',
      description: 'Upload in-app banner designs and promotional content',
      icon: <LayoutTemplate className="w-6 h-6" />,
      color: 'bg-orange-50',
      accepted: 'image/*',
      placeholder: 'Select banner images',
      multiple: true
    }
  ];

  const handleFileUpload = (type, files) => {
    const fileArray = Array.from(files);
    setUploadedFiles(prev => ({
      ...prev,
      [type]: [...prev[type], ...fileArray]
    }));
  };

  const removeFile = (type, index) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Previous Content</h1>
          <p className="text-gray-500 mt-2">
            Help our AI understand your content style and brand patterns
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {contentTypes.map((type) => (
            <Card key={type.id} className={`${type.color} border-none`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      {type.icon}
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {type.title}
                        {type.recommended && (
                          <Badge className="bg-amber-100 text-amber-700 font-normal">
                            Recommended
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="border-2 border-dashed border-gray-200 rounded-lg bg-white">
                  <div className="flex items-center justify-center p-4">
                    <label className="w-full cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept={type.accepted}
                        multiple={type.multiple}
                        onChange={(e) => handleFileUpload(type.id, e.target.files)}
                      />
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Drag and drop or click to upload
                        </span>
                        <Button variant="outline" size="sm">
                          Browse Files
                        </Button>
                      </div>
                    </label>
                  </div>
                </div>

                {uploadedFiles[type.id].length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles[type.id].map((file, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-2 bg-white rounded-lg border"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-sm truncate max-w-[200px]">
                            {file.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(type.id, index)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Button variant="outline">
            Skip for now
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Upload at least one file type</span>
            </div>
            <Button 
              className="bg-blue-500 hover:bg-blue-600"
              disabled={Object.values(uploadedFiles).every(files => files.length === 0)}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentUploadScreen;
