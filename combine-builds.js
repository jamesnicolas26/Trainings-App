const fs = require("fs");
const path = require("path");
const fse = require("fs-extra"); // For handling file operations

// Paths
const frontendBuildPath = path.join(__dirname, "pdrrmo-training", "build");
const backendBuildPath = path.join(__dirname, "pdrrmo-backend", "build");
const combinedBuildPath = path.join(__dirname, "build");

// Utility to move builds
const moveBuild = (src, dest, subFolder) => {
  const targetPath = subFolder ? path.join(dest, subFolder) : dest;

  if (fs.existsSync(src)) {
    fse.copySync(src, targetPath, { overwrite: true });
    console.log(`Moved ${src} to ${targetPath}`);
  } else {
    console.error(`Source path ${src} does not exist.`);
  }
};

// Clean up old combined build folder
if (fs.existsSync(combinedBuildPath)) {
  fse.removeSync(combinedBuildPath);
}
fs.mkdirSync(combinedBuildPath);

// Move frontend and backend builds to combined build folder
moveBuild(frontendBuildPath, combinedBuildPath, "frontend");
moveBuild(backendBuildPath, combinedBuildPath, "backend");

console.log("Combined builds successfully moved to the root build folder.");
