#!/usr/bin/env Node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = process.argv.slice(2)
const pkg = require("../package.json");
const context = {
  xthjVersion: pkg.version,
};

const cli = yargs()

cli.usage("Usage: hj <command> [options]")
.strict()
.demandCommand(1, "A command is required. Pass --help to see all available commands and options.")
.alias("h", "help")
.alias("v", "version")
.wrap(cli.terminalWidth())
.epilogue('xthj forever !!!')
.options({
  debug: {
    type: 'boolean',
    describe: 'bootstrap debug mode',
    alias: 'd'
  }
})
.group(['d'], 'Dev options:')
.command('init [name]', 'Do init a project', (yargs) => {
  yargs.option('name', {
    type: 'string',
    describe: 'name of a project',
    alias: 'n'
  })
}, (argv) => {
  console.log(argv)
})
.command({
  command: 'list [name]',
  aliases: ['ls'],
  describe: 'list a list',
  builder: function(yargs) {
    yargs.option('name', {
      type: 'string',
      describe: 'name of a list',
      alias: 'n'
    })
  },
  handler(argv) {
    console.log(argv)
  }
})
.recommendCommands()
.parse(argv, context);