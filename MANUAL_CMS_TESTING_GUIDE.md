# Manual CMS Testing Guide

Based on the PRD requirements, here's a step-by-step guide to manually test all CMS functionality.

## Prerequisites

1. **Start the development server**: `npm run dev`
2. **Server URL**: http://localhost:3001 (or 3000 if available)
3. **Test Credentials**:
   - Email: `test@lagougah.com`
   - Password: `TestAdmin123!`

## Testing Checklist

### ✅ 1. User Authentication & Login

**Test Steps**:
1. Navigate to: `http://localhost:3001/cms`
2. Verify login page loads with email/password fields
3. Enter test credentials:
   - Email: `test@lagougah.com`
   - Password: `TestAdmin123!`
4. Click "Sign In" or "Login"
5. Verify successful redirect to CMS dashboard

**Expected Results**:
- ✅ Login page displays correctly
- ✅ Credentials are accepted
- ✅ Dashboard loads with navigation sidebar
- ✅ User sees options like Posts, Banners, etc.

---

### ✅ 2. Account Management - User Management

**Test Steps**:
1. From CMS dashboard, look for "User Management" or "Users" link
2. Click on the user management section
3. Verify user list displays
4. Test "Create User" functionality:
   - Click "Create User" button
   - Fill in email, name, role
   - Save new user
5. Test "Edit User" functionality:
   - Select existing user
   - Modify role or information
   - Save changes

**Expected Results**:
- ✅ User Management section accessible (Admin only)
- ✅ User list displays with roles and status
- ✅ Create user form works
- ✅ Edit user functionality works
- ✅ Role-based permissions enforced

---

### ✅ 3. Post Management

**Test Steps**:
1. Click "Posts" in the sidebar navigation
2. Verify posts list page loads
3. Test "Create Post":
   - Click "Create Post" button
   - Fill in title: "Test Post for CMS"
   - Add content: "This is a test post created during manual testing"
   - Set status (draft/published)
   - Save post
4. Test "Edit Post":
   - Select existing post
   - Modify title or content
   - Save changes
5. Test "Delete Post":
   - Select a test post
   - Click delete
   - Confirm deletion

**Expected Results**:
- ✅ Posts page loads with existing posts
- ✅ Create post form works
- ✅ Posts can be edited
- ✅ Posts can be deleted
- ✅ Status management works (draft/published)

---

### ✅ 4. Banner Management - Page-Specific Hero Banners

**Test Steps**:
1. Click "Banners" in the sidebar navigation
2. Verify banner management page loads
3. Check for page-specific tabs:
   - ✅ Homepage tab
   - ✅ Technology tab
   - ✅ Story tab
   - ✅ News tab
   - ✅ General tab
4. Test "Create Banner":
   - Click "Create Banner" button
   - Fill in banner details:
     - Title: "Test Hero Banner"
     - Description: "Test description for hero banner"
     - Page Type: Select "Homepage"
     - Position: Select "Hero"
     - Link: "https://example.com"
     - Link Text: "Learn More"
   - Test image upload functionality
   - Save banner
5. Test banner activation/deactivation
6. Test banner editing
7. Test banner deletion

**Expected Results**:
- ✅ Banner management interface loads
- ✅ Page-specific tabs work
- ✅ Create banner form functions
- ✅ Image upload works
- ✅ Banner status can be toggled
- ✅ Banners can be edited and deleted

---

### ✅ 5. Image Upload Functionality

**Test Steps**:
1. In banner creation/edit form
2. Look for file upload section
3. Test drag-and-drop upload:
   - Drag an image file onto the upload area
   - Verify upload progress
   - Check image preview
4. Test click-to-upload:
   - Click "Upload" or "Choose File"
   - Select image from file browser
   - Verify upload and preview
5. Test image replacement:
   - Upload new image to replace existing
   - Verify old image is replaced

**Expected Results**:
- ✅ File upload interface visible
- ✅ Drag-and-drop works
- ✅ Click-to-upload works
- ✅ Image preview displays
- ✅ Upload progress shown
- ✅ File replacement works

---

### ✅ 6. Menu Item Management

**Test Steps**:
1. Click "Menu Items" or "Menu" in sidebar
2. Verify menu management page loads
3. Test visibility toggles:
   - Toggle menu item visibility (hide/show)
   - Save changes
4. Test menu item editing:
   - Edit menu item title or URL
   - Save changes

**Expected Results**:
- ✅ Menu management page loads
- ✅ Menu items list displays
- ✅ Visibility toggles work
- ✅ Menu editing functions
- ✅ Changes persist after save

---

### ✅ 7. Contact Settings Management

**Test Steps**:
1. Click "Contact Settings" or "Contact" in sidebar
2. Verify contact settings page loads
3. Test contact information updates:
   - Update email address
   - Update phone number
   - Update address
   - Update social media links
4. Save changes
5. Verify changes persist

**Expected Results**:
- ✅ Contact settings page loads
- ✅ Current contact info displays
- ✅ Form fields are editable
- ✅ Changes can be saved
- ✅ Updates persist after refresh

---

### ✅ 8. Frontend Integration Testing

**Test Steps**:
1. **Homepage Testing**:
   - Navigate to: `http://localhost:3001/`
   - Verify homepage loads
   - Check if hero banner displays (if configured)
   - Verify page structure and content

2. **Technology Page Testing**:
   - Navigate to: `http://localhost:3001/technology`
   - Verify page loads
   - Check for page-specific hero banner
   - Verify content displays correctly

3. **Story Page Testing**:
   - Navigate to: `http://localhost:3001/story`
   - Verify page loads
   - Check for page-specific hero banner
   - Verify content displays correctly

4. **News Page Testing**:
   - Navigate to: `http://localhost:3001/news`
   - Verify page loads
   - Check for published posts
   - Verify page-specific hero banner

**Expected Results**:
- ✅ All pages load without errors
- ✅ Hero banners display correctly
- ✅ Published posts appear on news page
- ✅ Menu visibility changes reflect on frontend
- ✅ Page content matches CMS settings

---

### ✅ 9. Role-Based Access Control

**Test Steps**:
1. As admin user, verify access to all features:
   - ✅ User Management
   - ✅ Posts
   - ✅ Banners
   - ✅ Menu Items
   - ✅ Contact Settings
2. Check for admin-only features:
   - User creation/deletion
   - Contact settings access
   - Advanced configuration options

**Expected Results**:
- ✅ Admin has full access
- ✅ Role-specific features visible
- ✅ Unauthorized features hidden
- ✅ Permission checks work

---

### ✅ 10. Cross-Page Integration

**Test Steps**:
1. **Create Hero Banner for Homepage**:
   - In CMS, create hero banner for homepage
   - Set as active
   - Visit homepage and verify banner displays

2. **Test Menu Visibility**:
   - In CMS, hide a menu item
   - Visit frontend and verify menu item is hidden
   - Show menu item and verify it reappears

3. **Test Post Publishing**:
   - Create new post in CMS
   - Set status to "published"
   - Visit news page and verify post appears
   - Visit homepage and check news section

**Expected Results**:
- ✅ CMS changes reflect immediately on frontend
- ✅ Banner management affects page hero sections
- ✅ Menu management affects navigation
- ✅ Post management affects news page and homepage

---

## Troubleshooting Common Issues

### Login Issues
- Verify development server is running
- Check browser console for errors
- Ensure correct URL (localhost:3001/cms)
- Verify test credentials are exact

### Upload Issues
- Check file size (should be reasonable)
- Verify file format (JPEG, PNG, WebP)
- Check browser console for upload errors
- Ensure stable internet connection

### Navigation Issues
- Clear browser cache
- Check for JavaScript errors
- Verify all components loaded
- Refresh page if needed

### Display Issues
- Check browser developer tools
- Verify responsive design
- Test different screen sizes
- Check CSS loading

---

## Success Criteria

All tests should pass with the following outcomes:

✅ **Authentication**: Login works with test credentials  
✅ **User Management**: Admin can manage users and roles  
✅ **Post Management**: CRUD operations work for posts  
✅ **Banner Management**: Page-specific banners can be managed  
✅ **Image Upload**: File upload functionality works  
✅ **Menu Management**: Menu visibility can be controlled  
✅ **Contact Settings**: Contact information can be updated  
✅ **Frontend Integration**: CMS changes reflect on public pages  
✅ **Role-Based Access**: Permissions enforced correctly  
✅ **Cross-Page Functionality**: All features work together seamlessly

---

## Test Results Log

Use this section to track your testing results:

| Test Section | Status | Notes | Issues Found |
|-------------|--------|-------|--------------|
| 1. Authentication | ⏳ | | |
| 2. Account Management | ⏳ | | |
| 3. Post Management | ⏳ | | |
| 4. Banner Management | ⏳ | | |
| 5. Image Upload | ⏳ | | |
| 6. Menu Management | ⏳ | | |
| 7. Contact Settings | ⏳ | | |
| 8. Frontend Integration | ⏳ | | |
| 9. Role-Based Access | ⏳ | | |
| 10. Cross-Page Integration | ⏳ | | |

**Legend**: ⏳ Pending | ✅ Passed | ❌ Failed | ⚠️ Issues Found

---

## Next Steps

After completing manual testing:

1. **Document Issues**: Record any bugs or problems found
2. **Performance Check**: Note any slow loading or performance issues
3. **UI/UX Feedback**: Note any user experience improvements needed
4. **Feature Requests**: Document any missing functionality
5. **Browser Testing**: Test in different browsers if needed

This comprehensive manual testing ensures all PRD requirements are met and the CMS functions as expected for end users. 