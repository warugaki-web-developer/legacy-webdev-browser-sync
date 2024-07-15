const fs = require('fs').promises;
const path = require('path');
const prettier = require('prettier');
const { distDir } = require('../_configs/paths');

// サイトURL
const siteURL = 'https://www.yourwebsite.com/';

// 除外するファイルやディレクトリのリスト
const excludePaths = [
  // 除外ファイルやディレクトリをここに追加
  // 例：'page/to/exclude.html'
];

// サイトマップの生成
async function generateSitemap() {
  const files = [];

  async function readDirRecursive(dir) {
    const items = await fs.readdir(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        await readDirRecursive(fullPath);
      } else if (stat.isFile()) {
        const relativePath = path.relative(distDir, fullPath);
        if (!excludePaths.includes(relativePath)) {
          files.push(relativePath);
        }
      }
    }
  }

  await readDirRecursive(distDir);

  const sitemapEntries = files
    .map((file) => {
      const url = file.replace(/\\/g, '/'); // Windows対応
      return `<url><loc>${siteURL}${url}</loc></url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>`;

  const formatted = await prettier.format(sitemap, { parser: 'html' });

  await fs.writeFile(path.join(distDir, 'sitemap.xml'), formatted, 'utf8');
  console.log('sitemap.xml has been generated and formatted.');
}

generateSitemap().catch((err) => {
  console.error('Error generating sitemap:', err);
});
