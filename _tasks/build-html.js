const cpx = require('cpx2');
const { srcPagesDir, distDir } = require('../_configs/paths');

const buildHTML = () => {
  cpx.copy(`${srcPagesDir}/**/*.html`, distDir, { update: true }, (err) => {
    if (err) {
      console.error(`Error copying HTML files: ${err}`);
    } else {
      console.log('HTML files copied successfully.');
    }
  });
};

buildHTML();
