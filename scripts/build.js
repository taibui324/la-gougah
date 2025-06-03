// This script temporarily renames the CMS folder during build to avoid static generation issues

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Folders to temporarily rename during build
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

console.log('Temporarily renaming folders to avoid build issues...');

// Store which folders were renamed
const renamedFolders = [];

// Rename folders
foldersToRename.forEach(folder => {
  if (fs.existsSync(folder.path)) {
    fs.renameSync(folder.path, folder.tempPath);
    renamedFolders.push(folder);
    console.log(`Renamed ${folder.path} to ${folder.tempPath}`);
  }
});

try {
  // Run the build command
  console.log('Running build command...');
  execSync('next build', { stdio: 'inherit' });
  
  // Build successful
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
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