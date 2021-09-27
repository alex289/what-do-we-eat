/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const prettyjson = require('prettyjson');
const inquirer = require('inquirer');

module.exports = function deleteCommand(foodList) {
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
        foodList.food.splice(index, 1);
        fs.writeFileSync('foodList.json', JSON.stringify(foodList));
        fs.writeFileSync(
          'foodList.ts',
          'const foodList =' +
            JSON.stringify(foodList) +
            '; export default foodList;'
        );
        foodList.food.map((item) => {
          console.log(prettyjson.render(item) + '\n');
        });
        found = true;
      }
    }
    if (!found) {
      console.log('Food not found');
    }
  });
};
