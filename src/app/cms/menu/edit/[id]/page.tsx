"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { CMSLayout } from "@/components/cms/layout/cms-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Save, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  href: z.string().min(1, { message: "URL is required" }),
  order: z.number().int().positive(),
  isVisible: z.boolean(),
  isExternal: z.boolean().optional(),
  description: z.string().optional(),
});

export default function EditMenuItemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const menuItemId = params.id as Id<"menuItems">;
  
  // Query to get menu item
  const menuItem = useQuery(api.menuItems.getMenuItemById, { id: menuItemId });
  
  // Mutation to update menu item
  const updateMenuItem = useMutation(api.menuItems.updateMenuItem);
  const toggleVisibility = useMutation(api.menuItems.toggleMenuItemVisibility);
  
  // State for loading
  const [isLoading, setIsLoading] = useState(true);

  // Set up form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      href: "",
      order: 1,
      isVisible: true,
      isExternal: false,
      description: "",
    },
  });

  const { isSubmitting } = form.formState;

  // Load menu item data when available
  useEffect(() => {
    if (menuItem) {
      form.reset({
        title: menuItem.title,
        href: menuItem.href,
        order: menuItem.order,
        isVisible: menuItem.isVisible,
        isExternal: menuItem.isExternal || false,
        description: menuItem.description || "",
      });
      setIsLoading(false);
    }
  }, [menuItem, form]);

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateMenuItem({
        id: menuItemId,
        title: values.title,
        href: values.href,
        order: values.order,
        description: values.description,
        isExternal: values.isExternal,
      });
      
      // Toggle visibility if needed in a separate call
      if (menuItem?.isVisible !== values.isVisible) {
        await toggleVisibility({
          id: menuItemId,
          isVisible: values.isVisible,
        });
      }
      
      const visibilityChangeMessage = menuItem?.isVisible !== values.isVisible
        ? values.isVisible
          ? " The corresponding section will now be displayed on the homepage."
          : " The corresponding section will now be hidden on the homepage."
        : "";
      
      toast({
        title: "Menu item updated",
        description: `The menu item has been successfully updated.${visibilityChangeMessage}`,
      });
      
      router.push("/cms/menu");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update menu item. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!menuItem && isLoading) {
    return (
      <CMSLayout>
        <div className="h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </CMSLayout>
    );
  }

  if (!menuItem && !isLoading) {
    return (
      <CMSLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Menu Item Not Found</h2>
          <p className="text-gray-600 mb-4">The menu item you're trying to edit doesn't exist or you don't have permission to access it.</p>
          <Button onClick={() => router.push("/cms/menu")}>
            Return to Menu Items
          </Button>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Edit Menu Item</h1>
          <Button variant="outline" onClick={() => router.push("/cms/menu")}>
            Cancel
          </Button>
        </div>

        {menuItem && menuItem.href.startsWith('#') && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Section Visibility</AlertTitle>
            <AlertDescription>
              This menu item links to the "{menuItem.title}" section on the homepage. 
              Changing visibility will also show/hide this section on the homepage.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Menu Item Details</CardTitle>
            <CardDescription>
              Update the navigation menu item
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Title field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Menu item title" {...field} />
                      </FormControl>
                      <FormDescription>
                        The text that will be displayed in the navigation menu
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* URL field */}
                <FormField
                  control={form.control}
                  name="href"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="/page or #section" {...field} />
                      </FormControl>
                      <FormDescription>
                        The link destination. Use # for page sections (e.g., #contact) or / for pages (e.g., /about)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Order field */}
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        />
                      </FormControl>
                      <FormDescription>
                        The order in which this item appears in the menu (lower numbers appear first)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of the menu item"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        For internal reference only, not displayed on the website
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* External link toggle */}
                <FormField
                  control={form.control}
                  name="isExternal"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">External Link</FormLabel>
                        <FormDescription>
                          Open link in a new tab
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Visibility toggle */}
                <FormField
                  control={form.control}
                  name="isVisible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Visibility</FormLabel>
                        <FormDescription>
                          {field.value 
                            ? "Item is visible in navigation and its section is shown on homepage" 
                            : "Item is hidden from navigation and its section is hidden on homepage"}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Submit button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-32"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CMSLayout>
  );
} 