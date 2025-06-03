"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { CMSLayout } from "@/components/cms/layout/cms-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function ContactSettingsPage() {
  const { toast } = useToast();
  const contactSettings = useQuery(api.contactSettings.getContactSettings);
  const updateContactSettings = useMutation(api.contactSettings.updateContactSettings);
  
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (contactSettings) {
      setFormData({
        email: contactSettings.email || "",
        phone: contactSettings.phone || "",
        address: contactSettings.address || "",
        facebook: contactSettings.socialLinks?.facebook || "",
        instagram: contactSettings.socialLinks?.instagram || "",
        twitter: contactSettings.socialLinks?.twitter || "",
        linkedin: contactSettings.socialLinks?.linkedin || "",
      });
    }
  }, [contactSettings]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateContactSettings({
        email: formData.email,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
        socialLinks: {
          facebook: formData.facebook || undefined,
          instagram: formData.instagram || undefined,
          twitter: formData.twitter || undefined,
          linkedin: formData.linkedin || undefined,
        },
      });
      
      toast({
        title: "Success",
        description: "Contact settings updated successfully",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update contact settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <CMSLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage contact information and social media links
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address*</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@lagougah.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St, City, Country"
                    rows={3}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Social Media Links</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                      placeholder="https://facebook.com/lagougah"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="https://instagram.com/lagougah"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      placeholder="https://twitter.com/lagougah"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/company/lagougah"
                    />
                  </div>
                </div>
              </div>
              
              <Button
                type="submit"
                className="bg-[#396CB1] hover:bg-[#273572]"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Settings"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </CMSLayout>
  );
} 