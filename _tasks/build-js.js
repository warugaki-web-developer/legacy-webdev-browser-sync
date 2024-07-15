const cpx = require('cpx2');
const { srcScriptsDir, distScriptsDir } = require('../_configs/paths');
const { promisify } = require('util');

const copyFiles = promisify(cpx.copy);

const buildJS = async () => {
  try {
    await copyFiles(`${srcScriptsDir}/**/*.js`, distScriptsDir, { update: true });
    console.log('JS files copied successfully.');
  } catch (err) {
    console.error(`Error copying JS files: ${err}`);
    process.exit(1);
  }
};

buildJS().catch((err) => {
  console.error(err);
  process.exit(1);
});
