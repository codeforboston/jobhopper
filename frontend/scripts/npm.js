const { runCommandsOrFail } = require('./utils');

const npmRun = cmd => `npm -s run ${cmd}`,
  lint = [npmRun('eslint'), npmRun('check-types')];

const scripts = {
  fix: ['prettier --write .', 'eslint --fix .'],
  lint,
  'lint-and-test': [...lint, npmRun('test')],
};

const selectedScript = process.argv[2];

runCommandsOrFail(scripts[selectedScript]);
