"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
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
import { Loader2, Save } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  href: z.string().min(1, { message: "URL is required" }),
  order: z.number().int().positive(),
  isVisible: z.boolean(),
  isExternal: z.boolean().optional(),
  description: z.string().optional(),
});

export default function NewMenuItemPage() {
  const router = useRouter();
  const { toast } = useToast();
  const createMenuItem = useMutation(api.menuItems.createMenuItem);
  const menuItems = useQuery(api.menuItems.getAllMenuItems);

  // Set up form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      href: "",
      order: menuItems?.length ? menuItems.length + 1 : 1,
      isVisible: true,
      isExternal: false,
      description: "",
    },
  });

  const { isSubmitting } = form.formState;

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createMenuItem({
        title: values.title,
        href: values.href,
        order: values.order,
        isVisible: values.isVisible,
        description: values.description,
        isExternal: values.isExternal,
      });

      toast({
        title: "Menu item created",
        description: "The new menu item has been successfully created.",
      });

      router.push("/cms/menu");
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message || "Failed to create menu item. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <CMSLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Add New Menu Item
          </h1>
          <Button variant="outline" onClick={() => router.push("/cms/menu")}>
            Cancel
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Menu Item Details</CardTitle>
            <CardDescription>Create a new navigation menu item</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                        The link destination. Use # for page sections (e.g.,
                        #contact) or / for pages (e.g., /about)
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
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 1)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        The order in which this item appears in the menu (lower
                        numbers appear first)
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
                        For internal reference only, not displayed on the
                        website
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
                        <FormLabel className="text-base">
                          External Link
                        </FormLabel>
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
                          Show this item in the navigation menu
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
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Menu Item
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
