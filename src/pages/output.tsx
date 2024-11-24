import * as React from "react";
import { useState } from "react";
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
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "react-router-dom";

const Output = () => {
  const location = useLocation();
  const { output } = location.state || {};

  const [content, setContent] = useState(output);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Select Marketing Channels
            </CardTitle>
            <CardDescription>
              Choose the channels and tools you'll use to execute your marketing
              strategy
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <pre className="whitespace-pre-wrap text-left ">
                  <p>{content}</p>
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Output;
