const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");


const questions = [
    {
        type: "input",
        message: "What is your favorite color?",
        name: "color"
      }
  
];

function writeToFile(fileName, data) {
 
}

function init() {
    inquirer.prompt(questions);
}

init();

function getGithubAPI() {
    axios.get("https://api.github.com/users/jayballa7")
    .then((data) => {
        console.log(data);
    }) 
    .catch((err) => {
        console.log("User not found");
        process.exit(1);
    })
}
//getGithubAPI();