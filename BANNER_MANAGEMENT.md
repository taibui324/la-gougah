# Banner Management System

## Overview

The Banner Management System allows administrators and editors to upload and manage page-specific hero banner images and general banner images for different positions across the La Gougah website. The system supports image uploads through Convex file storage and provides a comprehensive interface for managing banners across different pages.

## Features

### Core Functionality
- **Page-Specific Banners**: Create banners for Homepage, Technology, Story, News, and General pages
- **Image Upload**: Direct file upload with preview functionality using Convex file storage
- **Position Management**: Support for Hero, Secondary, and Footer banner positions
- **Status Control**: Activate/deactivate banners with visual status indicators
- **Order Management**: Control display order of banners within each position
- **Role-Based Access**: Admin and Editor roles can manage banners

### Enhanced Image Upload
- **File Upload Interface**: Drag-and-drop or click-to-upload functionality
- **Image Preview**: Real-time preview of uploaded images
- **Storage Integration**: Seamless integration with Convex file storage
- **Format Support**: Supports common image formats (JPEG, PNG, WebP, etc.)
- **Size Optimization**: Automatic handling of image storage and retrieval

### Banner Display Integration
- **Hero Banner Component**: Reusable component for displaying page-specific hero banners
- **Fallback Support**: Graceful fallback to default content when no banner is set
- **Responsive Design**: Mobile-friendly banner display
- **Dynamic Content**: Real-time updates when banners are changed in CMS

## Database Schema

### Banners Table
```typescript
interface Banner {
  _id: string;
  title: string;
  description?: string;
  image?: string;              // Legacy URL field
  imageStorageId?: string;     // Convex storage ID for uploaded files
  link?: string;
  linkText?: string;
  pageType: "homepage" | "technology" | "story" | "news" | "general";
  position: "hero" | "secondary" | "footer";
  isActive: boolean;
  order: number;
  createdAt: number;
  updatedAt: number;
}
```

### Indexes
- `by_pageType`: Efficient querying by page type
- `by_pageType_position`: Combined index for page-specific position queries
- `by_isActive`: Quick filtering of active/inactive banners

## Backend Functions

### Core Banner Functions
- `getAllBanners()`: Retrieve all banners with role-based access
- `getBannersByPage(pageType)`: Get banners for a specific page
- `getHeroBannerByPage(pageType)`: Get active hero banner for a page
- `createBanner(data)`: Create new banner with image upload support
- `updateBanner(id, data)`: Update existing banner
- `deleteBanner(id)`: Delete banner and associated files
- `activateBanner(id)` / `deactivateBanner(id)`: Toggle banner status

### Statistics Functions
- `getBannerStats()`: Comprehensive statistics including:
  - Total banner count
  - Active/inactive counts
  - Counts by page type
  - Counts by position

## Frontend Components

### BannerManagement Component
**Location**: `src/components/cms/dashboard/banner-management.tsx`

**Features**:
- Tabbed interface for different page types
- Statistics dashboard with visual cards
- Create/Edit dialogs with comprehensive forms
- Image upload with drag-and-drop support
- Table view with image previews
- Status management and bulk operations

**Key Sections**:
1. **Statistics Cards**: Overview of banner counts and status
2. **Page Tabs**: Separate views for each page type
3. **Banner Table**: List view with image previews and actions
4. **Create Dialog**: Form for adding new banners with image upload
5. **Edit Dialog**: Form for updating existing banners

### HeroBanner Component
**Location**: `src/components/ui/hero-banner.tsx`

**Purpose**: Reusable component for displaying page-specific hero banners

**Features**:
- Automatic fetching of page-specific hero banners
- Fallback content when no banner is set
- Responsive design with overlay text
- Call-to-action button integration
- Scroll indicator for user guidance

**Usage Example**:
```tsx
import { HeroBanner } from "@/components/ui/hero-banner";

// In your page component
<HeroBanner 
  pageType="homepage"
  fallbackTitle="Welcome to La Gougah"
  fallbackDescription="Discover amazing experiences"
  fallbackImage="/images/default-hero.jpg"
/>
```

## Image Upload Workflow

### Upload Process
1. **File Selection**: User selects image file via file input or drag-and-drop
2. **Validation**: Client-side validation of file type and size
3. **Upload**: File uploaded to Convex storage via `generateUploadUrl`
4. **Storage**: File stored with unique ID in Convex file storage
5. **Reference**: Storage ID saved in banner record for retrieval

### File Retrieval
- **API Endpoint**: `/api/storage/[storageId]` for accessing uploaded files
- **Component Integration**: Automatic URL generation in banner components
- **Fallback Handling**: Graceful fallback to default images when files are unavailable

## User Interface

### Navigation
- **CMS Sidebar**: "Banners" link visible to Admin and Editor roles
- **Access Control**: Automatic role-based visibility

### Banner Management Interface
1. **Statistics Dashboard**: Visual overview of banner metrics
2. **Page Tabs**: Organized view by page type (Homepage, Technology, Story, News, General)
3. **Action Buttons**: Create, Edit, Activate/Deactivate, Delete
4. **Image Previews**: Thumbnail views in table listings
5. **Status Indicators**: Visual badges for active/inactive status

### Create/Edit Forms
- **Title**: Required field for banner title
- **Description**: Optional descriptive text
- **Image Upload**: File upload with preview
- **Page Type**: Dropdown selection
- **Position**: Hero, Secondary, or Footer
- **Link**: Optional URL for call-to-action
- **Link Text**: Custom button text
- **Order**: Display order within position
- **Status**: Active/Inactive toggle

## Role-Based Access Control

### Admin Users
- Full access to all banner management functions
- Can create, edit, delete, and manage all banners
- Access to statistics and analytics

### Editor Users
- Can create, edit, and manage banners
- Cannot delete banners created by other users
- Limited access to sensitive operations

### User Role (Read-Only)
- No access to banner management interface
- Can only view published content

## API Integration

### File Storage API
```typescript
// Upload URL generation
const uploadUrl = await generateUploadUrl();

// File upload
const result = await fetch(uploadUrl, {
  method: "POST",
  headers: { "Content-Type": file.type },
  body: file,
});

// Storage ID extraction
const { storageId } = await result.json();
```

### Banner Retrieval
```typescript
// Get hero banner for homepage
const heroBanner = useQuery(api.banners.getHeroBannerByPage, { 
  pageType: "homepage" 
});

// Access uploaded image
const imageUrl = heroBanner?.imageStorageId 
  ? `/api/storage/${heroBanner.imageStorageId}`
  : heroBanner?.image || fallbackImage;
```

## Best Practices

### Image Guidelines
- **Recommended Size**: 1920x1080px for hero banners
- **File Format**: JPEG or PNG for best compatibility
- **File Size**: Keep under 2MB for optimal loading
- **Aspect Ratio**: 16:9 for hero banners, flexible for others

### Content Guidelines
- **Title**: Keep concise and impactful (max 60 characters)
- **Description**: Brief and engaging (max 200 characters)
- **Call-to-Action**: Clear and action-oriented button text

### Performance Considerations
- **Image Optimization**: Use appropriate file sizes and formats
- **Caching**: Leverage browser caching for uploaded images
- **Lazy Loading**: Implement for non-critical banner positions

## Troubleshooting

### Common Issues

1. **Upload Failures**
   - Check file size limits
   - Verify file format compatibility
   - Ensure stable internet connection

2. **Image Not Displaying**
   - Verify storage ID is correctly saved
   - Check API endpoint accessibility
   - Confirm file wasn't deleted from storage

3. **Permission Errors**
   - Verify user role and permissions
   - Check authentication status
   - Confirm role-based access controls

### Error Handling
- **Upload Errors**: User-friendly error messages with retry options
- **Network Issues**: Graceful degradation with fallback content
- **Storage Errors**: Automatic fallback to default images

## Future Enhancements

### Planned Features
- **Bulk Upload**: Multiple image upload capability
- **Image Editing**: Basic crop and resize functionality
- **Analytics**: Banner performance tracking
- **A/B Testing**: Multiple banner variants for testing
- **Scheduling**: Time-based banner activation
- **Templates**: Pre-designed banner templates

### Technical Improvements
- **CDN Integration**: Faster image delivery
- **WebP Support**: Modern image format optimization
- **Progressive Loading**: Enhanced user experience
- **Mobile Optimization**: Responsive image serving

## Conclusion

The enhanced Banner Management System provides a comprehensive solution for managing page-specific hero banners and general banners across the La Gougah website. With integrated image upload functionality, role-based access control, and a user-friendly interface, content managers can efficiently create and maintain engaging visual content that enhances the user experience across all pages. 