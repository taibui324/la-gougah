const fs = require('fs');
const path = require('path');

// Path to the analytics file
const analyticsPath = path.join(process.cwd(), 'public', 'analytics.html');
// Path to the output directory
const outDir = path.join(process.cwd(), 'out');

// Read the analytics HTML
const analyticsContent = fs.readFileSync(analyticsPath, 'utf8');

// Function to inject analytics into HTML files
function injectAnalytics(filePath) {
  // Read the HTML file
  const html = fs.readFileSync(filePath, 'utf8');
  
  // Inject analytics before the closing </head> tag
  const injectedHTML = html.replace('</head>', `${analyticsContent}</head>`);
  
  // Write the modified HTML back to the file
  fs.writeFileSync(filePath, injectedHTML);
}

// Function to process all HTML files in a directory recursively
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(filePath);
    } else if (path.extname(file) === '.html') {
      // Process HTML files
      injectAnalytics(filePath);
    }
  });
}

// Check if the output directory exists
if (fs.existsSync(outDir)) {
  console.log('Injecting analytics into HTML files...');
  processDirectory(outDir);
  console.log('Analytics injection complete.');
} else {
  console.error('Output directory not found. Run "npm run build" first.');
  process.exit(1);
} 