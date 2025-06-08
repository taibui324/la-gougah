const fs = require('fs');
const path = require('path');

// Path to the analytics file
const analyticsPath = path.join(process.cwd(), 'public', 'analytics.html');

// Check for both possible output directories
const outDir = path.join(process.cwd(), 'out');
const nextStaticDir = path.join(process.cwd(), '.next', 'static');
const nextServerDir = path.join(process.cwd(), '.next', 'server', 'app');

// Determine which output directory exists
let outputDirectory = null;
if (fs.existsSync(outDir)) {
  outputDirectory = outDir;
  console.log('Using static export directory (out)...');
} else if (fs.existsSync(nextStaticDir) || fs.existsSync(nextServerDir)) {
  // For Vercel deployment, analytics should be injected differently
  // Skip analytics injection for Vercel builds as it handles analytics through other means
  console.log('Detected Vercel/Next.js build - skipping analytics injection');
  process.exit(0);
} else {
  console.log('No output directory found - skipping analytics injection');
  process.exit(0);
}

// Check if analytics file exists
if (!fs.existsSync(analyticsPath)) {
  console.log('Analytics file not found - skipping injection');
  process.exit(0);
}

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

// Process the output directory
if (outputDirectory) {
  console.log('Injecting analytics into HTML files...');
  processDirectory(outputDirectory);
  console.log('Analytics injection complete.');
} 