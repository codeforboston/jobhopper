const process = require('process');
const shell = require('shelljs');

const runCommands = commands =>
  commands.map(command => {
    console.log(`>>> Running "${command}"`);
    return shell.exec(command).code;
  });

const runCommandsOrFail = commands => {
  if (runCommands(commands).some(code => code !== 0)) {
    failProcess();
  }
};

const failProcess = () => (process.exitCode = 1);

module.exports = { runCommandsOrFail };
