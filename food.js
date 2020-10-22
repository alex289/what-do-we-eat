'use strict';

const fs = require('fs');
const inquirer = require('inquirer');
const { Command } = require('commander');

const program = new Command();
program.version(require('./package.json').version);
program
  .option('-a, --add', 'add new food')
  .option('-g, --get', 'get food list');

program.parse(process.argv);

const rawdata = fs.readFileSync('food.json');
const foodList = JSON.parse(rawdata);

if (program.add) {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: "What's the name of the food",
    },
    {
      type: 'input',
      name: 'size',
      message: 'What size does it has per people',
    },
    {
      type: 'confirm',
      name: 'deliverable',
      message: 'Is it deliverable',
    },
    {
      type: 'number',
      name: 'effort',
      message: "What's the effort to cook",
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    foodList.food.push(answers);
    fs.writeFileSync('food.json', JSON.stringify(foodList));
    console.log(JSON.stringify(answers, null, '  '));
  });
}

if (program.get || !program.add) {
  foodList.food.map((item) => {
    console.log(item);
  });
}
