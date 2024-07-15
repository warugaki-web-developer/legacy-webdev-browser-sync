const fs = require('fs');
const path = require('path');
const { rimraf } = require('rimraf');
const { srcDir, distDir, publicDir } = require('../_configs/paths');

// ソースファイルから拡張子マッピング
const extensionsMap = {
  '.pcss': '.css',
  '.ts': '.js',
};

const getDistFilePath = (srcFilePath) => {
  let distFilePath;

  if (srcFilePath.startsWith(publicDir)) {
    distFilePath = path.join(distDir, path.relative(publicDir, srcFilePath));
  } else {
    distFilePath = path.join(distDir, path.relative(srcDir, srcFilePath));

    for (const [srcExt, distExt] of Object.entries(extensionsMap)) {
      if (distFilePath.endsWith(srcExt)) {
        distFilePath = distFilePath.replace(new RegExp(`${srcExt}$`), distExt);
        break;
      }
    }

    // 'pages'ディレクトリを削除
    distFilePath = distFilePath.replace('pages/', '');
  }

  return distFilePath;
};

const cleanupDist = async (srcFilePath) => {
  const distFilePath = getDistFilePath(srcFilePath);

  try {
    await rimraf(distFilePath, { glob: false });
    console.log(`Deleted: ${distFilePath}`);
  } catch (err) {
    console.error(`Error deleting ${distFilePath}:`, err);
    process.exit(1);
  }
};

const watchDir = async (dir) => {
  fs.watch(dir, { recursive: true }, async (eventType, filename) => {
    console.log(`Event: ${eventType}, File: ${filename}`);
    const filePath = path.join(dir, filename);
    try {
      await fs.promises.access(filePath);
    } catch {
      if (eventType === 'rename') {
        await cleanupDist(filePath);
      }
    }
  });
};

// srcDirとpublicDirを監視
watchDir(srcDir);
watchDir(publicDir);
