import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 10242;

// Use the correct paths for Home Assistant add-on
const basePath = '/usr/local/bin/halfmind';
const publicPath = join(basePath, 'public');
const distPath = basePath;

// Debug: Log the current directory structure
console.log('[DEBUG] Base path:', basePath);
console.log('[DEBUG] Public path:', publicPath);
console.log('[DEBUG] Dist path:', distPath);
console.log('[DEBUG] Public directory exists:', existsSync(publicPath));
console.log('[DEBUG] Dist directory exists:', existsSync(distPath));
if (existsSync(distPath)) {
    console.log('[DEBUG] Dist directory contents:', readdirSync(distPath));
}

// Serve static files from the public directory
app.use(express.static(publicPath));
app.use('/dist', express.static(distPath));

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`[DEBUG] Request received: ${req.method} ${req.url}`);
    next();
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`[INFO] Halfmind web server started on port ${port}`);
}); 