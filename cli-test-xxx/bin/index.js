#!/usr/bin/env Node
const lib = require('cli-test-xxx-lib')
const argv = require('process').argv;

const command = argv[2]

if (command.startsWith('--') || command === '-v') {
  console.log('v1.0.0')
} else {
  console.log(command)
}