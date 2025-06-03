# Menu Item Visibility & Homepage Sections

## Overview

The La Gougah CMS now implements a connected visibility system where hiding or showing a menu item in the navigation also controls the visibility of its corresponding section on the homepage. This document explains how this feature works and how to use it effectively.

## How It Works

1. **Menu Items in Navigation**: Each menu item in the header navigation can be toggled between visible and hidden states.

2. **Linked Homepage Sections**: When a menu item is hidden, its corresponding section on the homepage will also be hidden. When the menu item is made visible again, the section will reappear.

3. **Section Identification**: The system identifies which section corresponds to which menu item based on the menu item's URL/href:
   - Menu items with fragment URLs (e.g., `#news`, `#contact`) control the visibility of sections with matching IDs
   - Menu items with path URLs (e.g., `/news`, `/contact`) control the visibility of sections that have matching IDs without the leading slash

## Using the Feature

### Hiding a Section

To hide a section from the homepage:

1. Go to the CMS at `http://localhost:3001/cms/` (or your production URL)
2. Navigate to "Menu Items" in the sidebar
3. Find the menu item corresponding to the section you want to hide
4. Toggle the visibility switch to the OFF position
5. The section will now be hidden from both the navigation menu and the homepage

### Showing a Section

To make a hidden section visible again:

1. Go to the CMS at `http://localhost:3001/cms/` (or your production URL)
2. Navigate to "Menu Items" in the sidebar
3. Find the menu item corresponding to the section you want to show
4. Toggle the visibility switch to the ON position
5. The section will now appear in both the navigation menu and the homepage

## Supported Sections

The following homepage sections can be controlled through menu item visibility:

- Origin Story (`#origin`)
- Products (`#products`)
- Technology (`#technology`)
- News (`#news`)
- Contact (`#contact`)

## Technical Implementation

The visibility system is implemented using a `SectionWrapper` component that:

1. Fetches the list of visible menu items from the Convex database
2. Checks if there's a matching menu item for each section
3. Only renders the section if a matching visible menu item exists

This ensures that the homepage sections are automatically synchronized with the menu item visibility settings in the CMS.

## Testing

A Playwright test has been created to verify this functionality. You can run it with:

```bash
npx playwright test tests/menu-section-visibility-test.spec.ts
```

This test verifies that toggling a menu item's visibility correctly affects its corresponding section on the homepage. 