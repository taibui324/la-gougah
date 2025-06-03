Brief DescriptionA Content Management System (CMS) that allows small business owners to manage their website content easily. Users can interact with the frontend through Convex APIs to create, edit, delete, and upload news posts and featured images. The CMS also enables users to manage banners, menu items, and contact settings seamlessly.
Features  

User Authentication: Enable secure sign-up and login for users with role-based permissions (admin, editor, user).  
Post Management: Allow users to create, edit, delete, and upload news posts with featured images. Posts include title, content body, featured image, status (draft, published, archived), and publication date. Published posts will appear on the dedicated news page and in the news section on the homepage.  
Banner Management: Provide functionality for users to upload and change banner images for hero, secondary, and footer positions.  
Menu Item Management: Allow users to hide or unhide menu items in the header, affecting the visibility of the corresponding content pages. When a menu item is hidden, its corresponding section on the homepage should also be hidden; when unhidden, the section should be displayed again.  
Contact Settings Management: Enable users to set and adjust their contact information including email address, phone, and social links.  
User Management: Provide functionalities for user roles and permissions, ensuring only authorized users can perform certain actions.

User Flow  

Users land on the login page and sign in using their credentials.  
Upon successful login, users are taken to the dashboard displaying options for Posts, Banners, Menu Items, and Contact Settings.  
Users select "Posts" to manage news content:
  - View a list of all existing posts with their status (draft, published, archived)
  - Create new posts with title, content, featured image, and publication status
  - Edit existing posts to update content or change publication status
  - Delete posts that are no longer needed
  - Preview posts before publishing
  - Published posts automatically appear on the news page and in the news section of the homepage
Users navigate to "Banners" to upload or change banner images for specific page positions.  
Users access the "Menu Items" section to hide or unhide menu items and corresponding content pages. Hiding a menu item will:
  - Remove it from the header navigation
  - Hide the corresponding section on the homepage
  - Restrict direct access to the dedicated page (if applicable)
Finally, users go to "Contact Settings" to adjust their contact information as needed.

Technical Stack  

Frontend: Next.js for a responsive user interface with React components.  
Backend: Convex for backend functions, database, and API handling.  
Database: Convex Database for storing user data, posts, banners, and settings.  
Authentication: Convex Authentication for secure user authentication with role-based permissions.  
File Storage: Convex File Storage for storing images and banner uploads.

Design Guidelines  

Styling Guidelines: Use a modern color palette with contrasting colors for readability. Typography should be clear and legible, using sans-serif fonts for body text and serif fonts for headings.  
Page Layout: A clean layout with a sidebar for navigation and a main content area to display relevant information. Each section should be easily accessible from the dashboard.  
Navigation Structure: A sidebar navigation with sections for Posts, Banners, Menu Items, and Contact Settings.

Backend Structure  

Database Schema:
- users: User information including email, name, role (admin, editor, user)
- posts: News articles with title, slug, content, image, publication date, status (draft, published, archived)
- menuItems: Navigation items with title, href, visibility status
- banners: Banner images for different positions (hero, secondary, footer)
- contactSettings: Contact information including email, phone, address, social links

Convex Functions:
- Posts: createPost, updatePost, deletePost, getPublishedPosts, getAllPosts, getPostById, getPostBySlug
- Menu Items: toggleMenuItemVisibility, updateMenuItem, createMenuItem, deleteMenuItem, getVisibleMenuItems
- Banners: createBanner, updateBanner, deleteBanner, getActiveBannersByPosition
- Users: updateUserRole, getCurrentUserInfo, updateProfile
- Authentication: requireAdmin, requireAdminOrEditor, getCurrentUser

Frontend Implementation:
- The homepage will check the visibility status of menu items before rendering the corresponding sections
- Each section component will be conditionally rendered based on the visibility status of its associated menu item
- A middleware or guard mechanism will prevent direct access to pages that correspond to hidden menu items

Security Measures: Role-based access control with three levels (admin, editor, user), data validation to ensure data integrity, and secure file storage for uploaded images.

In-Scope and Out-of-Scope ItemsIn-Scope:  

Core features as listed above including user authentication, post management, banner management, menu item management, and contact settings.

Out-of-Scope:  

Advanced analytics or reporting features.  
Integration with third-party applications or services.  
User notifications or email services beyond contact settings.

