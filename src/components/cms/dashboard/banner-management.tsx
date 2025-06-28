"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  BarChart3,
  Monitor,
  Globe,
  FileText,
  Newspaper,
  Upload,
  X,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type PageType = "homepage" | "technology" | "story";
type Position = "hero" | "secondary" | "footer";

interface Banner {
  _id: string;
  title: string;
  image?: string;
  imageStorageId?: string;
  link?: string;
  pageType: PageType;
  position: Position;
  isSlider: boolean;
  sliderGroup?: string;
  isActive: boolean;
  order: number;
  createdAt: number;
  updatedAt: number;
}

interface BannerFormData {
  title: string;
  image: string;
  imageStorageId: string;
  link: string;
  pageType: PageType;
  position: Position;
  isSlider: boolean;
  sliderGroup: string;
  isActive: boolean;
  order: number;
}

const pageTypeLabels = {
  homepage: "Homepage",
  technology: "Technology Page",
  story: "Story Page",
};

const pageTypeIcons = {
  homepage: Monitor,
  technology: Globe,
  story: FileText,
};

const positionLabels = {
  hero: "Hero Banner",
  secondary: "Secondary Banner",
  footer: "Footer Banner",
};

export function BannerManagement() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [selectedPage, setSelectedPage] = useState<PageType>("homepage");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<BannerFormData>({
    title: "",
    image: "",
    imageStorageId: "",
    link: "",
    pageType: "homepage",
    position: "hero",
    isSlider: false,
    sliderGroup: "",
    isActive: true,
    order: 1,
  });

  // Queries
  const banners = useQuery(api.banners.getAllBanners);
  const bannerStats = useQuery(api.banners.getBannerStats);
  const currentUser = useQuery(api.users.getCurrentUserInfo);

  // Mutations
  const generateUploadUrl = useMutation(api.http.generateUploadUrl);
  const createBanner = useMutation(api.banners.createBanner);
  const updateBanner = useMutation(api.banners.updateBanner);
  const deleteBanner = useMutation(api.banners.deleteBanner);
  const activateBanner = useMutation(api.banners.activateBanner);
  const deactivateBanner = useMutation(api.banners.deactivateBanner);

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);

      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("Please select an image file.");
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("Image size must be less than 10MB.");
      }

      // Generate upload URL
      const uploadUrl = await generateUploadUrl();
      console.log("Generated upload URL:", uploadUrl);

      // Upload the file
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        const errorText = await result.text();
        console.error("Upload failed with status:", result.status, errorText);
        throw new Error(`Failed to upload image: ${result.status} ${errorText}`);
      }

      // Get the storage ID from the response
      const { storageId } = await result.json();
      console.log("File uploaded successfully, storageId:", storageId);

      // Create image preview URL (use the blob for immediate preview)
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Update form data with storage ID but not the direct URL
      // The direct URL will be constructed when needed using the storage ID
      setFormData((prev) => ({
        ...prev,
        imageStorageId: storageId,
        // Don't set the image field - we'll use the storage ID instead
        image: "",
      }));

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({
      ...prev,
      image: "",
      imageStorageId: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCreateBanner = async () => {
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Please provide a banner title",
        variant: "destructive",
      });
      return;
    }

    // For hero banners, require an image
    if (
      formData.position === "hero" &&
      !formData.imageStorageId &&
      !formData.image
    ) {
      toast({
        title: "Error",
        description: "Hero banners require an image",
        variant: "destructive",
      });
      return;
    }

    try {
      await createBanner({
        title: formData.title,
        image: formData.image || undefined,
        imageStorageId: (formData.imageStorageId as any) || undefined,
        link: formData.link || undefined,
        pageType: formData.pageType,
        position: formData.position,
        isSlider: formData.isSlider,
        sliderGroup: formData.sliderGroup || undefined,
        isActive: formData.isActive,
        order: formData.order,
      });

      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Success",
        description: "Banner created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create banner",
        variant: "destructive",
      });
    }
  };

  const handleUpdateBanner = async () => {
    if (!selectedBanner || !formData.title) {
      toast({
        title: "Error",
        description: "Please provide a banner title",
        variant: "destructive",
      });
      return;
    }

    // For hero banners, require an image
    if (
      formData.position === "hero" &&
      !formData.imageStorageId &&
      !formData.image
    ) {
      toast({
        title: "Error",
        description: "Hero banners require an image",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateBanner({
        id: selectedBanner._id as any,
        title: formData.title,
        image: formData.image || undefined,
        imageStorageId: (formData.imageStorageId as any) || undefined,
        link: formData.link || undefined,
        pageType: formData.pageType,
        position: formData.position,
        isSlider: formData.isSlider,
        sliderGroup: formData.sliderGroup || undefined,
        isActive: formData.isActive,
        order: formData.order,
      });

      setIsEditDialogOpen(false);
      setSelectedBanner(null);
      resetForm();
      toast({
        title: "Success",
        description: "Banner updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update banner",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBanner = async (banner: Banner) => {
    if (!window.confirm(`Are you sure you want to delete "${banner.title}"?`)) {
      return;
    }

    try {
      await deleteBanner({ id: banner._id as any });
      toast({
        title: "Success",
        description: "Banner deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete banner",
        variant: "destructive",
      });
    }
  };

  const handleToggleStatus = async (banner: Banner) => {
    try {
      if (banner.isActive) {
        await deactivateBanner({ id: banner._id as any });
        toast({
          title: "Success",
          description: "Banner deactivated",
        });
      } else {
        await activateBanner({ id: banner._id as any });
        toast({
          title: "Success",
          description: "Banner activated",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update banner status",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (banner: Banner) => {
    setSelectedBanner(banner);

    // Generate image URL if we have storage ID but no image URL
    let imageUrl = banner.image || "";
    if (banner.imageStorageId && !banner.image) {
      imageUrl = `${window.location.protocol}//${window.location.host}/api/storage/${banner.imageStorageId}`;
    }

    setFormData({
      title: banner.title,
      image: imageUrl,
      imageStorageId: banner.imageStorageId || "",
      link: banner.link || "",
      pageType: banner.pageType,
      position: banner.position,
      isSlider: banner.isSlider,
      sliderGroup: banner.sliderGroup || "",
      isActive: banner.isActive,
      order: banner.order,
    });

    // Set image preview if there's an existing image
    if (imageUrl) {
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }

    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      image: "",
      imageStorageId: "",
      link: "",
      pageType: "homepage",
      position: "hero",
      isSlider: false,
      sliderGroup: "",
      isActive: true,
      order: 1,
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getPageIcon = (pageType: PageType) => {
    const Icon = pageTypeIcons[pageType];
    return <Icon className="h-4 w-4" />;
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <Badge variant={isActive ? "default" : "secondary"}>
        {isActive ? "Active" : "Inactive"}
      </Badge>
    );
  };

  const getPositionBadge = (position: Position) => {
    const colors = {
      hero: "bg-purple-100 text-purple-800",
      secondary: "bg-blue-100 text-blue-800",
      footer: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge className={colors[position]}>{positionLabels[position]}</Badge>
    );
  };

  // Filter banners by selected page
  const filteredBanners =
    banners?.filter((banner) => banner.pageType === selectedPage) || [];

  // Check if current user is admin or editor
  const canManageBanners =
    currentUser?.role === "admin" || currentUser?.role === "editor";

  if (!canManageBanners) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You don't have permission to manage banners.
          </p>
        </div>
      </div>
    );
  }

  const ImageUploadSection = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <Label>Banner Image {formData.position === "hero" && " *"}</Label>

      {imagePreview ? (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Banner preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            {formData.position === "hero"
              ? "Upload a hero banner image (required)"
              : "Upload a banner image (optional)"}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Choose Image"}
          </Button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="text-sm text-gray-500">
        <p>
          Recommended size: 1920x1080px for hero banners, 800x400px for other
          positions
        </p>
        <p>Maximum file size: 10MB. Supported formats: JPG, PNG, WebP</p>
      </div>

      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span>Or provide an image URL:</span>
      </div>

      <Input
        value={formData.image}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, image: e.target.value }));
          if (e.target.value) {
            setImagePreview(e.target.value);
          }
        }}
        placeholder="https://example.com/image.jpg"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Banner Management
          </h1>
          <p className="text-gray-600">
            Manage page-specific banners and slider images
          </p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Banner</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title (For Internal Reference) *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Enter internal title for reference"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This title is for internal reference only and will not be displayed on the banner
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pageType">Page</Label>
                  <Select
                    value={formData.pageType}
                    onValueChange={(value: PageType) =>
                      setFormData((prev) => ({ ...prev, pageType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homepage">Homepage</SelectItem>
                      <SelectItem value="technology">
                        Technology Page
                      </SelectItem>
                      <SelectItem value="story">Story Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value: Position) =>
                      setFormData((prev) => ({ ...prev, position: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hero">Hero Banner</SelectItem>
                      <SelectItem value="secondary">
                        Secondary Banner
                      </SelectItem>
                      <SelectItem value="footer">Footer Banner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="isSlider"
                      checked={formData.isSlider}
                      onChange={(e) => 
                        setFormData((prev) => ({...prev, isSlider: e.target.checked}))
                      }
                      className="w-5 h-5"
                    />
                    <Label htmlFor="isSlider">This banner is part of a slider/carousel</Label>
                  </div>
                  
                  {formData.isSlider && (
                    <div className="pl-7">
                      <Label htmlFor="sliderGroup">Slider Group Name</Label>
                      <Input
                        id="sliderGroup"
                        value={formData.sliderGroup}
                        onChange={(e) => 
                          setFormData((prev) => ({...prev, sliderGroup: e.target.value}))
                        }
                        placeholder="e.g., main-slider"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Group banners together in the same slider (use the same name for all slides)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="link">Link URL (Optional)</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, link: e.target.value }))
                    }
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        order: parseInt(e.target.value) || 1,
                      }))
                    }
                    min="1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Controls the order of banners in a slider (lower numbers appear first)
                  </p>
                </div>
              </div>

              <ImageUploadSection />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateBanner} disabled={uploading}>
                Create Banner
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      {bannerStats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Banners
              </CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bannerStats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {bannerStats.active}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive</CardTitle>
              <EyeOff className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {bannerStats.inactive}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Hero Banners
              </CardTitle>
              <Monitor className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {bannerStats.byPosition.hero}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Homepage</CardTitle>
              <Monitor className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {bannerStats.byPage.homepage}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Page Tabs */}
      <Tabs
        value={selectedPage}
        onValueChange={(value: string) => setSelectedPage(value as PageType)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="homepage" className="flex items-center space-x-2">
            <Monitor className="h-4 w-4" />
            <span>Homepage</span>
          </TabsTrigger>
          <TabsTrigger
            value="technology"
            className="flex items-center space-x-2"
          >
            <Globe className="h-4 w-4" />
            <span>Technology</span>
          </TabsTrigger>
          <TabsTrigger value="story" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Story</span>
          </TabsTrigger>
        </TabsList>

        {(
          ["homepage", "technology", "story"] as PageType[]
        ).map((pageType) => (
          <TabsContent key={pageType} value={pageType}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getPageIcon(pageType)}
                  <span>{pageTypeLabels[pageType]} Banners</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredBanners.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBanners.map((banner) => (
                        <TableRow key={banner._id}>
                          <TableCell>
                            {banner.image || banner.imageStorageId ? (
                              <img
                                src={
                                  banner.image ||
                                  `/api/storage/${banner.imageStorageId}`
                                }
                                alt={banner.title}
                                className="w-16 h-10 object-cover rounded"
                              />
                            ) : (
                              <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center">
                                <ImageIcon className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            <div>
                              <div>{banner.title}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getPositionBadge(banner.position)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(banner.isActive)}
                          </TableCell>
                          <TableCell>{banner.order}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(banner)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleStatus(banner)}
                              >
                                {banner.isActive ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteBanner(banner)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No banners found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Create your first banner for {pageTypeLabels[pageType]}
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Banner
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Banner Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Banner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Title (For Internal Reference) *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter banner title"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This title is for internal reference only
                </p>
              </div>
              <div>
                <Label htmlFor="edit-isSlider">Slider</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="edit-isSlider"
                    checked={formData.isSlider}
                    onChange={(e) => 
                      setFormData((prev) => ({...prev, isSlider: e.target.checked}))
                    }
                    className="w-5 h-5"
                  />
                  <Label htmlFor="edit-isSlider">This is part of a slider</Label>
                </div>
              </div>
            </div>

            {formData.isSlider && (
              <div>
                <Label htmlFor="edit-sliderGroup">Slider Group</Label>
                <Input
                  id="edit-sliderGroup"
                  value={formData.sliderGroup}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sliderGroup: e.target.value,
                    }))
                  }
                  placeholder="e.g., main-slider"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Group banners together in the same slider
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-pageType">Page</Label>
                <Select
                  value={formData.pageType}
                  onValueChange={(value: PageType) =>
                    setFormData((prev) => ({ ...prev, pageType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homepage">Homepage</SelectItem>
                    <SelectItem value="technology">Technology Page</SelectItem>
                    <SelectItem value="story">Story Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-position">Position</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value: Position) =>
                    setFormData((prev) => ({ ...prev, position: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero Banner</SelectItem>
                    <SelectItem value="secondary">Secondary Banner</SelectItem>
                    <SelectItem value="footer">Footer Banner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-link">Link URL (Optional)</Label>
                <Input
                  id="edit-link"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, link: e.target.value }))
                  }
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="edit-order">Display Order</Label>
                <Input
                  id="edit-order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      order: parseInt(e.target.value) || 1,
                    }))
                  }
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lower numbers appear first in sliders
                </p>
              </div>
            </div>

            <ImageUploadSection isEdit />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateBanner} disabled={uploading}>
              Update Banner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
