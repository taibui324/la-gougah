# Product Requirements Document (PRD)

## Brief Description
A Content Management System (CMS) that allows small business owners to manage their website content easily. Users can interact with the frontend through Convex APIs to create, edit, delete, and upload news posts and featured images with **full markdown support** for rich content creation. The CMS also enables users to manage banners, menu items, and contact settings seamlessly.

## Features  

**User Authentication**: Enable secure sign-up and login for users with role-based permissions (admin, editor, user).  

**Account Management**: Allow admin users to create new user accounts and assign roles with specific permission levels:
  - Admin: Full access to all features including user management, post management, banner management, menu management, and contact settings
  - Editor: Read and write access to posts, banners, and menu items (cannot manage users or contact settings)
  - User: Read-only access to view content and basic dashboard functionality

**Enhanced Post Management with Full Markdown Support**: Allow users to create, edit, delete, and upload news posts with comprehensive markdown capabilities:

*Core Post Features:*
- Title, slug, and meta description
- Full markdown content with live preview
- Featured image upload and management
- Status management (draft, published, archived)
- Publication date and scheduling
- Author attribution and revision history

*Markdown Editor Features:*
- **Live Preview**: Split-pane or toggle view showing rendered markdown in real-time
- **Syntax Highlighting**: Color-coded markdown syntax for better readability
- **Rich Text Toolbar**: Quick access buttons for common formatting (bold, italic, headers, lists, links, images)
- **Markdown Shortcuts**: Keyboard shortcuts for rapid formatting (Ctrl+B for bold, Ctrl+I for italic, etc.)
- **Auto-completion**: Smart suggestions for markdown syntax and common patterns
- **Drag & Drop Support**: Drag images and files directly into the editor
- **Full Screen Mode**: Distraction-free writing environment

*Supported Markdown Elements:*
- Headers (H1-H6) with automatic table of contents generation
- Text formatting (bold, italic, strikethrough, code inline)
- Lists (ordered, unordered, nested, task lists with checkboxes)
- Links (internal, external, with title attributes)
- Images (with alt text, captions, and responsive sizing)
- Code blocks with syntax highlighting for multiple programming languages
- Tables with alignment options
- Blockquotes and callout boxes
- Horizontal rules and dividers
- Footnotes and references
- Mathematical expressions (LaTeX support)
- Emoji support with shortcodes

*Content Management Features:*
- **Import/Export**: Import markdown files (.md) and export posts as markdown
- **Template System**: Pre-defined markdown templates for common post types
- **Content Snippets**: Reusable markdown snippets for common elements
- **Image Management**: Integrated image upload with automatic markdown insertion
- **Link Validation**: Automatic checking of internal and external links
- **Word Count & Reading Time**: Real-time statistics display
- **Auto-save**: Automatic draft saving every 30 seconds
- **Version Control**: Track changes and allow rollback to previous versions
- **Date Display Format**: Display published dates in dd/mm/yyyy format on post listings and detail pages

*SEO and Optimization:*
- **SEO Preview**: Show how the post will appear in search results
- **Meta Tag Management**: Custom meta titles, descriptions, and keywords
- **Open Graph Support**: Social media preview optimization
- **Canonical URLs**: Prevent duplicate content issues
- **Schema Markup**: Automatic structured data generation
- **Content Analysis**: SEO scoring and readability analysis

**Banner Management**: Provide functionality for users to upload and manage page-specific hero banner images and slider functionality for different pages. Specifically includes:
  - Page-specific hero banners for Homepage, Technology page, and Story page
  - Banner slider functionality allowing multiple images to be displayed in sequence
  - Ordered image upload and management in the CMS with the ability to set display order
  - Navigation controls (previous/next buttons) on the main page to navigate through banner slides
  - Image upload, preview, and replacement capabilities
  - Banner status management (active/inactive) for each page
  - Option to group banners into slider collections
  - Focus on image-based banners without text overlays (designers will handle banner design)
  - Support for optional link URLs to make banners clickable

**Menu Item Management**: Allow users to hide or unhide menu items in the header, affecting the visibility of the corresponding content pages. When a menu item is hidden, its corresponding section on the homepage should also be hidden; when unhidden, the section should be displayed again.  

**Contact Settings Management**: Enable users to set and adjust their contact information including email address, phone, and social links.  

**User Management**: Provide functionalities for user roles and permissions, ensuring only authorized users can perform certain actions.

## User Flow  

Users land on the login page and sign in using their credentials.  

Upon successful login, users are taken to the dashboard displaying options based on their role permissions.

Admin users have access to an additional "User Management" section where they can:
  - View a list of all existing users with their roles and status
  - Create new user accounts by providing email, name, and assigning a role (admin, editor, user)
  - Edit existing user information and update their roles
  - Deactivate or delete user accounts when necessary
  - Send account creation notifications to new users

Users select "Posts" to manage news content (admin and editor roles):
  - View a list of all existing posts with their status (draft, published, archived)
  - **Create new posts using the enhanced markdown editor**:
    - Enter title and generate SEO-friendly slug
    - Write content using full markdown syntax with live preview
    - Use toolbar for quick formatting or keyboard shortcuts
    - Upload and embed images directly in the markdown content
    - Add featured image with alt text and captions
    - Configure SEO settings (meta title, description, keywords)
    - Set publication status and schedule publishing if needed
    - Preview the final rendered post before publishing
  - **Edit existing posts with full markdown capabilities**:
    - Load existing content in the markdown editor
    - Make changes with real-time preview
    - Track revision history and compare versions
    - Update SEO settings and featured images
    - Change publication status or reschedule
  - Delete posts that are no longer needed
  - **Import markdown files** from external sources
  - **Export posts** as markdown files for backup or migration
  - **Bulk operations** for multiple posts (publish, archive, delete)
  - Published posts automatically appear on the news page and in the news section of the homepage

Users navigate to "Banners" to manage page-specific hero banners and banner sliders (admin and editor roles):
  - Upload and manage hero banners for specific pages (Homepage, Technology, Story)
  - Create banner sliders by uploading multiple images in a specific order
  - Arrange and reorder banner images within a slider using drag-and-drop or order controls
  - Set each banner's display order to control the sequence in the slider
  - Group related banners together for different slider collections
  - Preview banner and slider appearance before publishing
  - Activate or deactivate individual banners or entire slider groups
  - Organize banners by page and position for easy management  

Users access the "Menu Items" section to hide or unhide menu items and corresponding content pages (admin and editor roles). Hiding a menu item will:
  - Remove it from the header navigation
  - Hide the corresponding section on the homepage
  - Restrict direct access to the dedicated page (if applicable)

Admin users go to "Contact Settings" to adjust their contact information as needed (admin role only).

## Technical Stack  

**Frontend**: Next.js for a responsive user interface with React components.  
**Backend**: Convex for backend functions, database, and API handling.  
**Database**: Convex Database for storing user data, posts, banners, and settings.  
**Authentication**: Convex Authentication for secure user authentication with role-based permissions.  
**File Storage**: Convex File Storage for storing images and banner uploads.
**Markdown Processing**: 
  - **Editor**: MDEditor or similar React markdown editor component
  - **Parser**: Remark/Rehype ecosystem for markdown processing
  - **Syntax Highlighting**: Prism.js or Highlight.js for code blocks
  - **Math Rendering**: KaTeX for mathematical expressions
  - **Sanitization**: DOMPurify for secure HTML output

## Design Guidelines  

**Styling Guidelines**: Use a modern color palette with contrasting colors for readability. Typography should be clear and legible, using sans-serif fonts for body text and serif fonts for headings.  

**Page Layout**: A clean layout with a sidebar for navigation and a main content area to display relevant information. Each section should be easily accessible from the dashboard.  

**Navigation Structure**: A sidebar navigation with sections for Posts, Banners, Menu Items, Contact Settings, and User Management (admin only).

**Markdown Editor Design**:
  - **Split Layout**: Side-by-side editor and preview panes with adjustable sizing
  - **Toolbar**: Intuitive icon-based toolbar with tooltips for markdown actions
  - **Syntax Highlighting**: Subtle color coding that doesn't interfere with readability
  - **Focus Mode**: Distraction-free writing environment with minimal UI
  - **Responsive Design**: Mobile-friendly editor with touch-optimized controls
  - **Accessibility**: Full keyboard navigation and screen reader support

## Backend Structure  

**Database Schema**:
- **users**: User information including email, name, role (admin, editor, user), status (active, inactive), createdAt, updatedAt
- **posts**: Enhanced news articles with:
  * Basic fields: title, slug, content (markdown), contentHtml (rendered), image, publication date, status
  * SEO fields: metaTitle, metaDescription, keywords, canonicalUrl
  * Social fields: ogTitle, ogDescription, ogImage, twitterTitle, twitterDescription, twitterImage
  * Analytics: wordCount, readingTime, seoScore, readabilityScore
  * Versioning: revisionHistory, lastModified, modifiedBy
  * Scheduling: scheduledAt, publishedAt
- **menuItems**: Navigation items with title, href, visibility status
- **banners**: Banner images with:
  * Basic fields: title (for internal reference), image, imageStorageId, link
  * Configuration: pageType (homepage, technology, story), position (hero, secondary, footer)
  * Slider functionality: isSlider flag, sliderGroup identifier, order number
  * Status: isActive flag, createdAt, updatedAt
- **contactSettings**: Contact information including email, phone, address, social links
- **postTemplates**: Reusable markdown templates for different post types
- **contentSnippets**: Reusable markdown snippets and components

**Convex Functions**:
- **Posts**: 
  * createPost, updatePost, deletePost, getPublishedPosts, getAllPosts, getPostById, getPostBySlug
  * **Markdown-specific**: processMarkdown, generateContentHtml, validateMarkdown, extractImages
  * **SEO**: analyzeSEO, generateMetaTags, calculateReadingTime, checkReadability
  * **Import/Export**: importMarkdownFile, exportPostAsMarkdown, bulkImportPosts
  * **Templates**: getPostTemplates, createTemplate, applyTemplate
  * **Versioning**: saveRevision, getRevisionHistory, restoreRevision
- **Menu Items**: toggleMenuItemVisibility, updateMenuItem, createMenuItem, deleteMenuItem, getVisibleMenuItems
- **Banners**: 
  * **Core Operations**: createBanner, updateBanner, deleteBanner, activateBanner, deactivateBanner
  * **Retrieval**: getActiveBannersByPosition, getBannersByPage, getHeroBannerByPage, getAllBanners, getBannerById
  * **Slider Functionality**: getActiveSlidersByGroup, updateBannerOrder, reorderBanners
- **Users**: createUser, updateUser, deleteUser, updateUserRole, getCurrentUserInfo, updateProfile, getAllUsers, getUsersByRole
- **Authentication**: requireAdmin, requireAdminOrEditor, getCurrentUser, requireUser
- **File Management**: uploadImage, generateUploadUrl, getStorageUrl, processImageForMarkdown, generateImageMarkdown, optimizeImages

**Frontend Implementation**:
- **Markdown Editor Component**: 
  * Real-time preview with synchronized scrolling
  * Toolbar with markdown formatting options
  * Drag-and-drop image upload integration
  * Auto-save functionality with visual indicators
  * Full-screen and focus modes
  * Keyboard shortcuts and accessibility features
- **Post Management Interface**:
  * Enhanced post creation/editing forms with markdown editor
  * SEO optimization panel with real-time analysis
  * Image management with markdown integration
  * Template selection and snippet insertion
  * Version history and comparison views
  * Import/export functionality
- **Banner Slider Components**:
  * Interactive carousel/slider for displaying multiple banner images
  * Navigation controls (previous/next buttons) for user interaction
  * Automatic slideshow functionality with configurable timing (default: 5 seconds)
  * Pagination indicators showing current position in the slider
  * Responsive design adapting to different screen sizes
  * Touch-enabled for mobile devices
  * Fallback to static hero banner when no slider images are available
  * Error handling for image loading failures
  * Support for linking banner images to external URLs
  * Smooth transitions between slides with fade effects
- **Banner Management Interface**:
  * Drag-and-drop interface for reordering banner images
  * Visual preview of banner sliders before publishing
  * Grouping controls to organize banners into slider collections
  * Order controls to set the sequence of banners in sliders
  * Toggle switches for activating/deactivating individual banners or entire sliders
- **Content Processing**:
  * Client-side markdown parsing for preview
  * Server-side rendering for final output
  * Image optimization and responsive sizing
  * Link validation and internal link resolution
  * SEO analysis and content scoring
- **Role-based Access Control**: 
  * Permission checks for all markdown editor features
  * Content approval workflows for different user roles
  * Audit logging for content changes

**Security Measures**: 
- Role-based access control with three levels (admin, editor, user)
- **Markdown Security**: Content sanitization to prevent XSS attacks, safe HTML rendering, file upload validation
- **Content Validation**: Markdown syntax validation, image file type checking, link safety verification
- Data validation to ensure data integrity
- Secure file storage for uploaded images
- Permission verification on all API endpoints to prevent unauthorized access

## In-Scope and Out-of-Scope Items

**In-Scope**:  
- Core features as listed above including user authentication, account management, enhanced post management with full markdown support
- **Markdown Features**: Complete markdown editor with live preview, syntax highlighting, toolbar, shortcuts, and all standard markdown elements
- **Content Management**: Import/export, templates, snippets, version control, auto-save
- **SEO Optimization**: Meta tags, social media optimization, content analysis, schema markup
- **Banner Management**: 
  * Page-specific banner management with hero banners for Homepage/Technology/Story pages
  * Banner slider functionality with ordered image uploads
  * Navigation controls for users to browse through banner slides
  * Grouping and ordering capabilities for banner collections
- Menu item management and contact settings
- **Performance**: Fast markdown rendering, optimized image handling, efficient content loading

**Out-of-Scope**:  
- Advanced analytics or reporting features beyond basic SEO scoring
- Integration with third-party applications or services (beyond basic social media meta tags)
- User notifications or email services beyond basic account creation notifications
- **Advanced Markdown**: Complex plugins, custom markdown extensions, collaborative editing
- **Content Workflows**: Advanced approval processes, content scheduling beyond basic date/time
- **Multi-language Support**: Internationalization and localization features
- **Advanced Media**: Video embedding, audio players, interactive media elements

