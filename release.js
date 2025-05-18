const fs = require('fs');

// Load package.json
const packageJson = require('./package.json');

// Increment version (example: "1.0.1" → "1.0.2")
const versionParts = packageJson.version.split('.');
versionParts[2] = parseInt(versionParts[2]) + 1; // Increase patch version
packageJson.version = versionParts.join('.');

// Save updated package.json
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

console.log(`Updated version to ${packageJson.version}`);

const { execSync } = require('child_process');

const newVersion = packageJson.version;
const tagName = `v${newVersion}`;

try {
    // Stage changes
    execSync('git add package.json');

    // Commit changes
    execSync(`git commit -m "Update version to ${newVersion}"`);

    // Create and push Git tag
    execSync(`git tag ${tagName}`);
    execSync(`git push origin ${tagName}`);

    console.log(`Successfully tagged and pushed: ${tagName}`);
} catch (error) {
    console.error('Error executing Git commands:', error);
}