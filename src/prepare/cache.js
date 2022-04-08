"use strict";

const fs = require(`fs-extra`);

const path = require(`path`);

function createEmptyCache() {
  return {
    timestamp: Date.now(),
    hash: `initial-run`,
    assets: {},
  };
}

console.log("set cache dir");
const cacheDir = process.cwd();
const cacheFile = path.join(cacheDir, `font-preload-cache.json`);
let cache;

fs.readdir(cacheDir, (err, files) => {
  files.forEach((file) => {
    console.log(file);
  });
});

function load() {
  console.log("loading cache");
  if (cache) return cache;

  try {
    console.log("reading cache");
    const json = fs.readFileSync(cacheFile, `utf-8`);
    console.log("parsing cache");
    cache = JSON.parse(json);
    return cache;
  } catch (err) {
    console.log("new cache");
    return createEmptyCache();
  }
}

function save(data) {
  try {
    console.log("saving cache");
    const json = JSON.stringify(data);
    fs.writeFileSync(cacheFile, json, `utf-8`);
    console.log("setting cache");
    cache = data;
  } catch (e) {
    console.log(
      `could not write to cache directory, please make sure the following path exists and is writable`
    );
    console.log(`  ${cacheDir}`);
    console.error(e);
    process.exit(1);
  }
}

module.exports.load = load;
module.exports.save = save;
module.exports.cacheFile = cacheFile;
