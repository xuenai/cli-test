#!/usr/bin/env Node

const commander = require('commander');
const pkg = require('../package.json')

// const { program } = commander
const program = new commander.Command()

program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .option('-d, --debug', '是否开启可调式模式', false)
  .option('-e, --envName <envName>', '获取环境变量的名称');

const clone = program.command('clone <source> [destination]')
clone
  .description('clone a repository')
  .option('-f, --force', '是否强制克隆')
  .action((source, description, cmdObj) => {
    console.log('do clone', source, description, cmdObj.force)
  })

// imooc-test install init -> imooc-cli init
program
  .command('install [name]', 'install package', {
    executableFile: 'imooc-cli',
    // isDefault: true,
    hidden: true,
  })
  .alias('i');

program
  .arguments('<command> [options]')
  .description('test command', {
    command: 'command to run',
    options: 'options for command',
  })
  .action(function(cmd, options) {
    console.log(cmd, options);
  });

// 高级定制1：自定义help信息
// program.helpInformation = function() {
//   return '';
// };
// program.on('--help', function() {
//   console.log('your help information');
// });

// 高级定制2：实现debug模式
program.on('option:debug', function() {
  if (program.debug) {
    process.env.LOG_LEVEL = 'verbose';
  }
  console.log(process.env.LOG_LEVEL);
});

// 高级定制3：对未知命令监听
program.on('command:*', function(obj) {
  // console.log(obj);
  console.error('未知的命令：' + obj[0]);
  const availableCommands = program.commands.map(cmd => cmd.name());
  // console.log(availableCommands);
  console.log('可用命令：' + availableCommands.join(','));
});

const service = new commander.Command('service')
service
  .command('start')
  .description('service start')
  .action(() => {
    console.log('start')
  })
service
  .command('stop')
  .description('service stop')
  .action(() => {
    console.log('stop')
  })

program.addCommand(service)
program.parse(process.argv)
