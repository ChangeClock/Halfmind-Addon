import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 10242;

// Use the correct paths for Home Assistant add-on
const basePath = '/usr/local/bin/halfmind';
const publicPath = path.join(basePath, 'public');
const distPath = basePath;

// Debug: Log the current directory structure
console.log('[DEBUG] Base path:', basePath);
console.log('[DEBUG] Public path:', publicPath);
console.log('[DEBUG] Dist path:', distPath);
console.log('[DEBUG] Public directory exists:', fs.existsSync(publicPath));
console.log('[DEBUG] Dist directory exists:', fs.existsSync(distPath));
if (fs.existsSync(distPath)) {
    console.log('[DEBUG] Dist directory contents:', fs.readdirSync(distPath));
}

// Serve static files from the public directory
app.use(express.static(publicPath));
app.use('/dist', express.static(distPath));

// Debug middleware to log all requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[DEBUG] Request received: ${req.method} ${req.url}`);
    next();
});

// Serve the main page
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`[INFO] Halfmind web server started on port ${port}`);
}); 