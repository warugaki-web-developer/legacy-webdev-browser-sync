const fs = require('fs');
const path = require('path');
const glob = require('glob');
const postcss = require('postcss');
const postcssConfig = require('../postcss.config.cjs');

const { srcDir, distDir } = require('../_configs/paths');

const buildCSS = async () => {
  // _で始まるファイルを除外するパターン
  const cssFiles = glob.sync(path.join(srcDir, '**/!(_)*.pcss'));

  for (const file of cssFiles) {
    const srcPath = file;
    const destPath = file.replace(srcDir, distDir).replace(/\.pcss$/, '.css');

    const css = fs.readFileSync(srcPath, 'utf8');
    const result = await postcss(postcssConfig.plugins).process(css, {
      from: srcPath,
      to: destPath,
    });

    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, result.css);

    if (result.map) {
      fs.writeFileSync(`${destPath}.map`, result.map.toString());
    }
  }
};

buildCSS().catch((err) => {
  console.error(err);
  process.exit(1);
});
