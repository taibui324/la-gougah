Brief DescriptionA Content Management System (CMS) that allows small business owners to manage their website content easily. Users can interact with the frontend through Convex APIs to create, edit, delete, and upload news posts and featured images. The CMS also enables users to manage banners, menu items, and contact settings seamlessly.
Features  

User Authentication: Enable secure sign-up and login for users with role-based permissions (admin, editor, user).  
Account Management: Allow admin users to create new user accounts and assign roles with specific permission levels:
  - Admin: Full access to all features including user management, post management, banner management, menu management, and contact settings
  - Editor: Read and write access to posts, banners, and menu items (cannot manage users or contact settings)
  - User: Read-only access to view content and basic dashboard functionality
Post Management: Allow users to create, edit, delete, and upload news posts with featured images. Posts include title, content body, featured image, status (draft, published, archived), and publication date. Published posts will appear on the dedicated news page and in the news section on the homepage.  
Banner Management: Provide functionality for users to upload and manage page-specific hero banner images and general banner images for different positions. Specifically includes:
  - Page-specific hero banners for Homepage, Technology page, Story page, and News page
  - General banner management for secondary and footer positions
  - Image upload, preview, and replacement capabilities
  - Banner status management (active/inactive) for each page  
Menu Item Management: Allow users to hide or unhide menu items in the header, affecting the visibility of the corresponding content pages. When a menu item is hidden, its corresponding section on the homepage should also be hidden; when unhidden, the section should be displayed again.  
Contact Settings Management: Enable users to set and adjust their contact information including email address, phone, and social links.  
User Management: Provide functionalities for user roles and permissions, ensuring only authorized users can perform certain actions.

User Flow  

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
  - Create new posts with title, content, featured image, and publication status
  - Edit existing posts to update content or change publication status
  - Delete posts that are no longer needed
  - Preview posts before publishing
  - Published posts automatically appear on the news page and in the news section of the homepage
Users navigate to "Banners" to manage page-specific hero banners and general banner images (admin and editor roles):
  - Upload and manage hero banners for specific pages (Homepage, Technology, Story, News)
  - Set banner titles, descriptions, and call-to-action buttons for each page
  - Preview banner appearance before publishing
  - Activate or deactivate banners for specific pages
  - Upload and manage general banners for secondary and footer positions
  - Organize banners by page and position for easy management  
Users access the "Menu Items" section to hide or unhide menu items and corresponding content pages (admin and editor roles). Hiding a menu item will:
  - Remove it from the header navigation
  - Hide the corresponding section on the homepage
  - Restrict direct access to the dedicated page (if applicable)
Admin users go to "Contact Settings" to adjust their contact information as needed (admin role only).

Technical Stack  

Frontend: Next.js for a responsive user interface with React components.  
Backend: Convex for backend functions, database, and API handling.  
Database: Convex Database for storing user data, posts, banners, and settings.  
Authentication: Convex Authentication for secure user authentication with role-based permissions.  
File Storage: Convex File Storage for storing images and banner uploads.

Design Guidelines  

Styling Guidelines: Use a modern color palette with contrasting colors for readability. Typography should be clear and legible, using sans-serif fonts for body text and serif fonts for headings.  
Page Layout: A clean layout with a sidebar for navigation and a main content area to display relevant information. Each section should be easily accessible from the dashboard.  
Navigation Structure: A sidebar navigation with sections for Posts, Banners, Menu Items, Contact Settings, and User Management (admin only).

Backend Structure  

Database Schema:
- users: User information including email, name, role (admin, editor, user), status (active, inactive), createdAt, updatedAt
- posts: News articles with title, slug, content, image, publication date, status (draft, published, archived)
- menuItems: Navigation items with title, href, visibility status
- banners: Banner images with page-specific targeting and position management including:
  * pageType (homepage, technology, story, news, general)
  * position (hero, secondary, footer)
  * title, description, and call-to-action text
  * image storage reference
  * isActive status
  * displayOrder for multiple banners per page
- contactSettings: Contact information including email, phone, address, social links

Convex Functions:
- Posts: createPost, updatePost, deletePost, getPublishedPosts, getAllPosts, getPostById, getPostBySlug
- Menu Items: toggleMenuItemVisibility, updateMenuItem, createMenuItem, deleteMenuItem, getVisibleMenuItems
- Banners: createBanner, updateBanner, deleteBanner, getActiveBannersByPosition, getBannersByPage, getHeroBannerByPage, activateBanner, deactivateBanner
- Users: createUser, updateUser, deleteUser, updateUserRole, getCurrentUserInfo, updateProfile, getAllUsers, getUsersByRole
- Authentication: requireAdmin, requireAdminOrEditor, getCurrentUser, requireUser

Frontend Implementation:
- The homepage will check the visibility status of menu items before rendering the corresponding sections
- Each page (Homepage, Technology, Story, News) will dynamically load and display its specific hero banner
- Each section component will be conditionally rendered based on the visibility status of its associated menu item
- A middleware or guard mechanism will prevent direct access to pages that correspond to hidden menu items
- Banner components will fetch page-specific banners based on the current page route
- Banner management interface will allow users to select specific pages when creating/editing banners
- Image upload interface with preview functionality for banner management
- Role-based navigation rendering to show/hide menu items based on user permissions
- Permission checks on all CMS actions to ensure users can only perform authorized operations

Security Measures: Role-based access control with three levels (admin, editor, user), data validation to ensure data integrity, secure file storage for uploaded images, and permission verification on all API endpoints to prevent unauthorized access.

In-Scope and Out-of-Scope ItemsIn-Scope:  

Core features as listed above including user authentication, account management, post management, page-specific banner management with hero banners for Homepage/Technology/Story/News pages, menu item management, and contact settings.

Out-of-Scope:  

Advanced analytics or reporting features.  
Integration with third-party applications or services.  
User notifications or email services beyond basic account creation notifications.

