'use strict';

const fs = require('fs');

const rawdata = fs.readFileSync('food.json');
const foodList = JSON.parse(rawdata);

// const userInput;

// foodList.food.push(userInput);
// fs.writeFileSync('food.json', JSON.stringify(foodList));

foodList.food.map(item => {
    console.log(item);
});