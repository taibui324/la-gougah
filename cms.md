Go to this page http://localhost:3000/cms/ and test all the functionalities to see if it works on the homepage http://localhost:3000/

for authentication:
* Email: test@lagougah.com
* Password: TestAdmin123!

## Post Management

The CMS includes a comprehensive post management system that allows administrators and editors to create, edit, delete, and manage news posts that are displayed on the website.

### Features

- Create new posts with title, content, featured image, and SEO-friendly slug
- Edit existing posts to update content or change publication status
- Delete posts that are no longer needed
- Preview posts before publishing
- Manage post status (draft, published, archived)
- Upload and manage featured images for posts
- Published posts automatically appear on the news page and news section on the homepage

### Implementation Details

Posts are stored in the `posts` table in Convex and include:

- Title
- Slug (URL-friendly identifier)
- Description (short summary)
- Content (full HTML content)
- Featured image
- Status (draft, published, archived)
- Publication date
- Creation and update timestamps
- Author information

The implementation uses the following files:

- `convex/posts.ts` - Backend functions for managing posts
- `convex/schema.ts` - Database schema definition for posts
- `src/app/cms/posts/page.tsx` - Admin UI for listing and managing posts
- `src/app/cms/posts/new/page.tsx` - Form for creating new posts
- `src/app/cms/posts/edit/[id]/page.tsx` - Form for editing existing posts
- `src/app/news/page.tsx` - Public news listing page
- `src/app/news/[slug]/page.tsx` - Public news detail page
- `src/components/news-section.tsx` - News section component for homepage

### API Functions

- `getPublishedPosts` - Public query to get all published posts
- `getPostBySlug` - Public query to get a specific post by its slug
- `getAllPosts` - Admin/editor query to get all posts (for CMS)
- `createPost` - Mutation to create a new post
- `updatePost` - Mutation to update an existing post
- `deletePost` - Mutation to delete a post

### Usage

1. Navigate to the "Posts" section in the CMS sidebar
2. View all existing posts with their status
3. Click "New Post" to create a new post
4. Fill in the post details (title, content, etc.) and upload a featured image
5. Save as draft or publish immediately
6. Edit or delete posts as needed
7. Change post status between draft, published, and archived
8. Published posts will automatically appear on the news page and news section

## Contact Settings Management

The CMS includes a dedicated contact settings management feature that allows administrators to update company contact information that is displayed on the public website.

### Features

- Update email address, phone number, and physical address
- Manage social media links (Facebook, Instagram, Twitter, LinkedIn)
- Changes reflect immediately on the public-facing website

### Implementation Details

Contact settings are stored in the `contactSettings` table in Convex and include:

- Email address (required)
- Phone number (optional)
- Physical address (optional)
- Social media links (optional)
  - Facebook
  - Instagram
  - Twitter
  - LinkedIn

The implementation uses the following files:

- `convex/contactSettings.ts` - Backend functions for managing contact settings
- `convex/schema.ts` - Database schema definition for contact settings
- `src/app/cms/contact/page.tsx` - Admin UI for managing contact settings
- `src/components/contact-info.tsx` - Component for displaying contact information on the public site
- `src/components/contact-section.tsx` - Contact section that uses the dynamic contact information

### API Functions

- `getContactSettings` - Admin-only query to get all contact settings
- `getPublicContactInfo` - Public query to get contact information for the website
- `updateContactSettings` - Mutation to update contact settings (admin only)
- `initializeContactSettings` - Utility function to initialize contact settings

### Usage

1. Navigate to the "Contact Settings" section in the CMS sidebar
2. Update contact information as needed
3. Click "Save Settings" to apply changes
4. Changes will be immediately reflected on the public website