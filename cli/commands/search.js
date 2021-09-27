/* eslint-disable @typescript-eslint/no-var-requires */
const prettyjson = require('prettyjson');
const inquirer = require('inquirer');

module.exports = function searchCommand(foodList) {
  const question = [
    {
      type: 'input',
      name: 'name',
      message: "What's the name of the food",
    },
  ];

  inquirer.prompt(question).then((answer) => {
    let found = false;
    for (let index = 0; index < foodList.food.length; index++) {
      if (foodList.food[index].name === answer.name) {
        console.log(prettyjson.render(foodList.food[index]));
        found = true;
      }
    }
    if (!found) {
      console.log('Food not found');
    }
  });
};
