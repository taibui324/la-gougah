"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { CMSLayout } from "@/components/cms/layout/cms-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Pencil, Trash, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MenuItemsPage() {
  const menuItems = useQuery(api.menuItems.getAllMenuItems);
  const toggleVisibility = useMutation(api.menuItems.toggleMenuItemVisibility);
  const deleteMenuItem = useMutation(api.menuItems.deleteMenuItem);
  const { toast } = useToast();
  const [pendingId, setPendingId] = useState<Id<"menuItems"> | null>(null);

  const handleToggleVisibility = async (id: Id<"menuItems">, currentValue: boolean) => {
    setPendingId(id);
    try {
      await toggleVisibility({ id, isVisible: !currentValue });
      const actionType = !currentValue ? "visible" : "hidden";
      toast({
        title: "Menu item updated",
        description: `Menu item is now ${actionType}. ${
          !currentValue 
            ? "The corresponding section will now be displayed on the homepage." 
            : "The corresponding section will now be hidden on the homepage."
        }`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update menu item visibility.",
        variant: "destructive",
      });
    } finally {
      setPendingId(null);
    }
  };

  const handleDeleteMenuItem = async (id: Id<"menuItems">) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      setPendingId(id);
      try {
        await deleteMenuItem({ id });
        toast({
          title: "Menu item deleted",
          description: "The menu item has been successfully deleted.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete menu item.",
          variant: "destructive",
        });
      } finally {
        setPendingId(null);
      }
    }
  };

  return (
    <CMSLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Menu Items</h1>
          <Button asChild>
            <a href="/cms/menu/new">Add New Menu Item</a>
          </Button>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Hiding a menu item will also hide its corresponding section on the homepage. 
            This affects sections like "News", "Products", "Origin Story", etc.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Manage Menu Items</CardTitle>
            <CardDescription>
              Control which items appear in your site navigation and which sections are visible on the homepage
            </CardDescription>
          </CardHeader>
          <CardContent>
            {menuItems === undefined ? (
              <div className="py-8 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : menuItems.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No menu items found.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.order}</TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.href}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={item.isVisible}
                            disabled={pendingId === item._id}
                            onCheckedChange={() =>
                              handleToggleVisibility(item._id, item.isVisible)
                            }
                          />
                          {item.isVisible ? (
                            <Eye className="h-4 w-4 text-gray-500" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          )}
                          <span className="text-sm text-gray-500">
                            {item.isVisible ? "Visible" : "Hidden"}
                            <span className="text-xs block text-gray-400">
                              {item.isVisible 
                                ? "Section shown on homepage" 
                                : "Section hidden on homepage"}
                            </span>
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a href={`/cms/menu/edit/${item._id}`}>
                              <Pencil className="h-4 w-4 mr-1" />
                              Edit
                            </a>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={pendingId === item._id}
                            onClick={() => handleDeleteMenuItem(item._id)}
                          >
                            {pendingId === item._id ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-1" />
                            ) : (
                              <Trash className="h-4 w-4 mr-1" />
                            )}
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </CMSLayout>
  );
} 