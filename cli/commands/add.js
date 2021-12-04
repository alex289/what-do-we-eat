/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const prettyjson = require('prettyjson');
const inquirer = require('inquirer');

module.exports = function addCommand(foodList) {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: "What's the name of the food",
    },
    {
      type: 'list',
      name: 'size',
      message: 'What size does it has per people',
      choices: ['1 person', '4 people', 'all'],
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
    let found = false;
    for (let index = 0; index < foodList.food.length; index++) {
      if (foodList.food[index].name === answers.name) {
        console.log('Food already exists');
        found = true;
      }
    }
    if (!found) {
      foodList.food.push(answers);
      fs.writeFileSync('foodList.json', JSON.stringify(foodList));
      fs.writeFileSync(
        'foodList.ts',
        'const foodList =' +
          JSON.stringify(foodList) +
          '; export default foodList;'
      );
      console.log(prettyjson.render(answers));
    }
  });
};
