/**
 * Generate a `.env.production` file depending on the value from TARGET_ENV environment variable
 * created with ❤️ by Tona González (@martiuh)
 */
const fs = require("fs");

/**
 * @description copies the given `.env.(base.)${TARGET_ENV}` file to a `.env.production` file.
 */

const env = {
  production: ".env.base.production",
  staging: ".env.base.staging",
  development: ".env.development",
};

function copyEnvFile() {
  const target = env[process.env.TARGET_ENV] || env.staging;
  const dotenvPath = process.cwd() + `/${target}`;
  const fileStats = fs.statSync(dotenvPath);

  if (!fileStats.isFile()) {
    console.error(`[copyEnvFile] ${dotenvPath} is not a valid file`);
  }

  const prodDotEnv = ".env.production";
  try {
    fs.copyFileSync(dotenvPath, `${process.cwd()}/${prodDotEnv}`);
    console.log(`${prodDotEnv} successfully copied with TARGET_ENV=${target}`);
  } catch (error) {
    console.error(
      `[copyEnvFile] there was an error copying ${prodDotEnv} file`,
    );
    console.error(error);
  }
  return;
}

copyEnvFile();
