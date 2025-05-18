const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const {
  IGNORED_DIRS,
  SUPPORTED_EXTENSIONS,
  EXT_JS,
  EXT_JSX,
  EXT_JSON,
  ENCODING,
  NODE_COMMAND,
  NODE_CHECK_ARG,
  SPAWN_STDIO,
  ROOT_DIR,
} = require("../src/constants/compilation");
const { ERROR_INVALID_JSON, ERROR_SYNTAX } = require('../src/constants/errorMessages');
const { SUCCESS_SYNTAX } = require('../src/constants/messages');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const fullPath = path.resolve(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      const isIgnored = IGNORED_DIRS.some((ignored) =>
        fullPath.includes(path.sep + ignored + path.sep)
      );
      if (!isIgnored) {
        results = results.concat(walk(fullPath));
      }
    } else if (SUPPORTED_EXTENSIONS.some((ext) => file.endsWith(ext))) {
      results.push(fullPath);
    }
  });

  return results;
}


const files = walk(path.resolve(ROOT_DIR));
let hasError = false;

files.forEach((file) => {
  if (file.endsWith(EXT_JS) || file.endsWith(EXT_JSX)) {
    const result = spawnSync(NODE_COMMAND, [NODE_CHECK_ARG, file], { stdio: SPAWN_STDIO });
    if (result.status !== 0) {
      hasError = true;
    }
  } else if (file.endsWith(EXT_JSON)) {
    try {
      const content = fs.readFileSync(file, ENCODING);
      JSON.parse(content);
    } catch (err) {
      console.error(` ${ERROR_INVALID_JSON} ${file}`);
      console.error(err.message);
      hasError = true;
    }
  }
});

if (hasError) {
  console.error(`${ERROR_SYNTAX}`);
  process.exit(1);
} else {
  console.log(`${SUCCESS_SYNTAX}`);
}
