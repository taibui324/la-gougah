# Account Management Feature

## Overview
The Account Management feature allows admin users to create, edit, and manage user accounts with role-based permissions in the La Gougah CMS.

## User Roles & Permissions

### Admin
- **Full access** to all features
- Can create, edit, and delete user accounts
- Can manage posts, banners, menu items, and contact settings
- Can access User Management dashboard

### Editor
- **Read & Write access** to content
- Can create, edit, and delete posts
- Can manage banners and menu items
- Cannot access User Management or Contact Settings

### User
- **Read-only access**
- Can view dashboard and content
- Cannot create, edit, or delete any content
- Cannot access administrative features

## Features Implemented

### Backend (Convex Functions)
- `users.js:getAllUsers` - Get all users (admin only)
- `users.js:getUsersByRole` - Get users by specific role (admin only)
- `users.js:createUser` - Create new user account (admin only)
- `users.js:updateUser` - Update existing user (admin only)
- `users.js:deleteUser` - Delete user account (admin only)
- `users.js:getUserStats` - Get user statistics (admin only)
- `users.js:getCurrentUserInfo` - Get current user information

### Frontend Components
- **User Management Page** (`/cms/users`)
  - User statistics dashboard
  - User list with role and status badges
  - Create user dialog
  - Edit user dialog
  - Delete user functionality

### Database Schema Updates
- Added `status` field (active/inactive)
- Added `createdAt` and `updatedAt` timestamps
- Enhanced role-based permissions

### Navigation Updates
- **Role-based sidebar navigation**
  - Admin: Full access to all sections
  - Editor: Access to Posts and Menu Items
  - User: Dashboard access only

## Usage

### Creating a New User
1. Navigate to `/cms/users` (admin only)
2. Click "Create User" button
3. Fill in user details:
   - Name (required)
   - Email (required)
   - Role (admin/editor/user)
   - Status (active/inactive)
4. Click "Create User"

### Editing a User
1. In the users table, click the edit button
2. Modify user details as needed
3. Click "Update User"

### Deleting a User
1. In the users table, click the delete button
2. Confirm deletion in the browser prompt
3. User will be permanently deleted

### User Statistics
The dashboard shows:
- Total users count
- Active users count
- Inactive users count
- Admin users count

## Security Features
- **Authentication required** for all user management operations
- **Admin-only access** to user management functions
- **Role-based navigation** prevents unauthorized access
- **Email uniqueness** validation
- **Self-deletion prevention** (users cannot delete themselves)

## Technical Implementation

### File Structure
```
src/
├── app/cms/users/
│   └── page.tsx                    # User management page
├── components/cms/
│   ├── dashboard/
│   │   └── user-management.tsx     # Main user management component
│   └── layout/
│       ├── cms-layout.tsx          # Updated with role-based props
│       └── cms-sidebar.tsx         # Role-based navigation
└── convex/
    ├── users.ts                    # User management functions
    ├── schema.ts                   # Updated user schema
    └── lib/auth.ts                 # Authentication helpers
```

### API Endpoints
All user management functions are accessible through Convex mutations and queries:
- Queries: `api.users.getAllUsers`, `api.users.getUserStats`, etc.
- Mutations: `api.users.createUser`, `api.users.updateUser`, etc.

## Testing
The feature has been tested with:
- User creation with different roles
- Role-based access control
- Navigation restrictions
- Toast notifications for success/error states

## Future Enhancements
- Email invitation system for new users
- Bulk user operations
- User activity logging
- Password reset functionality
- Advanced user filtering and search 