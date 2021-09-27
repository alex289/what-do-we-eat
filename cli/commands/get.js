/* eslint-disable @typescript-eslint/no-var-requires */
const prettyjson = require('prettyjson');

module.exports = function getCommand(foodList) {
  foodList.food.map((item) => {
    console.log(prettyjson.render(item) + '\n');
  });
};
