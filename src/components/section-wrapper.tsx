"use client";

import { ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface SectionWrapperProps {
  children: ReactNode;
  sectionId: string;
  fallback?: ReactNode;
}

/**
 * A component that conditionally renders its children based on whether
 * a menu item with a matching href is visible.
 */
export default function SectionWrapper({ children, sectionId, fallback }: SectionWrapperProps) {
  // Fetch all visible menu items
  const menuItems = useQuery(api.menuItems.getVisibleMenuItems);
  
  // If we're still loading menu items, render nothing or a fallback
  if (!menuItems) {
    return fallback || null;
  }
  
  // Check if there's a visible menu item with a matching href
  // We check for both exact match and fragment match (e.g. '#news' and '/news')
  const isVisible = menuItems.some(item => {
    // For section IDs, we look for hrefs that either:
    // 1. Match exactly the section ID with # prefix (e.g. '#news')
    // 2. Are paths to the section's dedicated page (e.g. '/news')
    return item.href === `#${sectionId}` || 
           item.href === `/${sectionId}` ||
           item.href === sectionId;
  });
  
  // Only render the children if the corresponding menu item is visible
  return isVisible ? <>{children}</> : (fallback || null);
} 