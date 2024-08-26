import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();

const rootDir = 'dist';
const port = 8080;

const localPathsToRegister = [rootDir];

const publicPath = path.resolve('./public');
if (fs.existsSync(publicPath)) {
    localPathsToRegister.push(publicPath);
}

// serve static assets normally
for (const localPathToRegister of localPathsToRegister) {
    app.use(express.static(localPathToRegister));
}

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (_, response) {
    response.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(port, 'localhost');
console.log('HTTP server started on port ' + port);