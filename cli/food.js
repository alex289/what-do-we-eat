#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const { Command } = require('commander');

const addCommand = require('./commands/add');
const editCommand = require('./commands/edit');
const searchCommand = require('./commands/search');
const deleteCommand = require('./commands/delete');
const getCommand = require('./commands/get');

const program = new Command();
program.version('1.0.0');
program.description('Cli to crud the food.json list');
program
  .option('-a, --add', 'add new food')
  .option('-g, --get', 'get food list')
  .option('-s, --search', 'search food in list')
  .option('-e, --edit', 'edit food from List')
  .option('-d, --delete', 'delete food from List');

program.parse(process.argv);
const options = program.opts();

if (Object.keys(options).length === 0) {
  program.help();
}

let rawdata;
try {
  rawdata = fs.readFileSync('foodList.json');
} catch (error) {
  console.error(
    '\x1b[31mMake sure the food list exists and follows standard json format'
  );
  process.exit(1);
}
const foodList = JSON.parse(rawdata.toString());

if (options.add) {
  addCommand(foodList);
}

if (options.edit) {
  editCommand(foodList);
}

if (options.search) {
  searchCommand(foodList);
}

if (options.delete) {
  deleteCommand(foodList);
}

if (options.get) {
  getCommand(foodList);
}
