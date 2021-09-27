/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const prettyjson = require('prettyjson');
const inquirer = require('inquirer');

module.exports = function editCommand(foodList) {
  const question = [
    {
      type: 'input',
      name: 'name',
      message: "What's the name of the food you want to change",
    },
  ];

  inquirer.prompt(question).then((answer) => {
    let found = false;
    for (let index = 0; index < foodList.food.length; index++) {
      if (foodList.food[index].name === answer.name) {
        const questions = [
          {
            type: 'input',
            name: 'name',
            message: "What's the new name of the food",
            default: foodList.food[index].name,
          },
          {
            type: 'input',
            name: 'size',
            message: 'What new size does it has per people',
            default: foodList.food[index].size,
          },
          {
            type: 'confirm',
            name: 'deliverable',
            message: 'Is the new food deliverable',
            default: foodList.food[index].deliverable,
          },
          {
            type: 'number',
            name: 'effort',
            message: "What's the new effort to cook",
            default: foodList.food[index].effort,
          },
        ];

        inquirer.prompt(questions).then((answers) => {
          foodList.food[index] = answers;
          fs.writeFileSync('foodList.json', JSON.stringify(foodList));
          fs.writeFileSync(
            'foodList.ts',
            'const foodList =' +
              JSON.stringify(foodList) +
              '; export default foodList;'
          );
          console.log(prettyjson.render(answers));
        });
        found = true;
      }
    }
    if (!found) {
      console.log('Food not found');
    }
  });
};
