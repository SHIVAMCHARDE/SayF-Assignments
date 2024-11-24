import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Palette, 
  Type, 
  Upload,
  Plus,
  X,
  ArrowRight,
  ImageIcon,
  History
} from 'lucide-react';

const BrandGuidelinesSetup = () => {

  const [brandColors, setBrandColors] = useState([]);
  const [newColor, setNewColor] = useState('#000000');
  const [brandInfo, setBrandInfo] = useState({
    name: '',
    description: '',
    tagline: '',
    website: '',
    typography: {
      primaryFont: '',
      secondaryFont: ''
    }
  });

  const navigate = useNavigate();

  const handleColorAdd = () => {
    if (!brandColors.includes(newColor)) {
      setBrandColors([...brandColors, newColor]);
      setNewColor('#000000');
    }
  };

  const removeColor = (colorToRemove) => {
    setBrandColors(brandColors.filter(color => color !== colorToRemove));
  };

  useEffect(() => {
    if( !localStorage.getItem('profile') ){
      navigate('/login')
    }
  }, [])
  

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Set Up Your Brand Guidelines</h1>
          <p className="text-gray-500 mt-2">Help us understand your brand's visual identity</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Brand Information</CardTitle>
            <CardDescription>
              Enter the basic information about your brand
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Basic Information */}
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Brand Name</label>
                <Input 
                  placeholder="Enter your brand name"
                  value={brandInfo.name}
                  onChange={(e) => setBrandInfo({...brandInfo, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Brand Description</label>
                <Textarea 
                  placeholder="Describe what your brand does and stands for"
                  value={brandInfo.description}
                  onChange={(e) => setBrandInfo({...brandInfo, description: e.target.value})}
                  className="h-24 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Brand Tagline</label>
                <Input 
                  placeholder="Your brand's slogan or tagline"
                  value={brandInfo.tagline}
                  onChange={(e) => setBrandInfo({...brandInfo, tagline: e.target.value})}
                />
              </div>
            </div>

            {/* Color Palette */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">Brand Colors</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-10 h-10 rounded border border-gray-200"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleColorAdd}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Color
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {brandColors.map((color, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-white"
                  >
                    <div 
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-mono">{color}</span>
                    <button
                      onClick={() => removeColor(color)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">Typography</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Primary Font</label>
                  <Input 
                    placeholder="e.g., Inter, Helvetica"
                    value={brandInfo.typography.primaryFont}
                    onChange={(e) => setBrandInfo({
                      ...brandInfo, 
                      typography: {
                        ...brandInfo.typography,
                        primaryFont: e.target.value
                      }
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Secondary Font</label>
                  <Input 
                    placeholder="e.g., Merriweather, Georgia"
                    value={brandInfo.typography.secondaryFont}
                    onChange={(e) => setBrandInfo({
                      ...brandInfo, 
                      typography: {
                        ...brandInfo.typography,
                        secondaryFont: e.target.value
                      }
                    })}
                  />
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-gray-500" />
                <h3 className="text-lg font-medium text-gray-900">Brand Logo</h3>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Drag and drop your logo file here, or click to browse
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">
                    Recommended: SVG, PNG or JPG (min. 500x500px)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col border-t bg-gray-50/50 p-6 space-y-4">
            <div className="w-full flex justify-between items-center">
              <Button variant="outline">
                Skip for now
              </Button>
              <Button 
                className="bg-blue-500 hover:bg-blue-600"
                disabled={!brandInfo.name}
              >
                Create New Brand
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="w-full border-t pt-4">
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <History className="w-4 h-4" />
                Import Previously Used Content
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BrandGuidelinesSetup;
