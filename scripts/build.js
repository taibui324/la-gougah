// This script temporarily renames the CMS folder during build to avoid static generation issues

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if we're in Vercel environment
const isVercel = process.env.VERCEL || process.env.VERCEL_ENV;

// Folders to temporarily rename during build (only for static export, not Vercel)
const foldersToRename = [
  { 
    path: path.join(__dirname, '../src/app/cms'),
    tempPath: path.join(__dirname, '../src/app/_cms')
  },
  { 
    path: path.join(__dirname, '../src/app/api'),
    tempPath: path.join(__dirname, '../src/app/_api')
  }
];

if (isVercel) {
  console.log('Detected Vercel environment - running Next.js build with API routes...');
  try {
    // Run normal Next.js build for Vercel (keep API routes)
    execSync('next build', { stdio: 'inherit' });
    console.log('Vercel build completed successfully!');
  } catch (error) {
    console.error('Vercel build failed:', error.message);
    process.exit(1);
  }
} else {
  console.log('Running static export build - temporarily renaming folders...');

  // Store which folders were renamed
  const renamedFolders = [];

  // Rename folders for static export
  foldersToRename.forEach(folder => {
    if (fs.existsSync(folder.path)) {
      fs.renameSync(folder.path, folder.tempPath);
      renamedFolders.push(folder);
      console.log(`Renamed ${folder.path} to ${folder.tempPath}`);
    }
  });

  try {
    // Run the build command for static export
    console.log('Running static build command...');
    execSync('next build', { stdio: 'inherit' });
    
    // Build successful
    console.log('Static build completed successfully!');
  } catch (error) {
    console.error('Static build failed:', error.message);
  } finally {
    // Rename folders back
    console.log('Restoring renamed folders...');
    renamedFolders.forEach(folder => {
      if (fs.existsSync(folder.tempPath)) {
        fs.renameSync(folder.tempPath, folder.path);
        console.log(`Restored ${folder.tempPath} to ${folder.path}`);
      }
    });
  }
} 