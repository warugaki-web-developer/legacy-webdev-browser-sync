const cpx = require('cpx2');
const { publicDir, distDir } = require('../_configs/paths');

const buildAssets = () => {
  console.log(`Copying assets from ${publicDir} to ${distDir}`);
  cpx.copy(`${publicDir}/**/*`, distDir, { update: true }, (err) => {
    if (err) {
      console.error(`Error copying assets: ${err}`);
      process.exit(1);
    } else {
      console.log('Assets copied successfully.');
    }
  });
};

buildAssets();
