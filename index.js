const inquirer = require("inquirer");
const axios = require("axios");
const pdf = require('html-pdf');
const generateHTML = require('./generateHTML', 'utf8');
var options = { format: 'Letter' };

const questions = [
    {
        type: "input",
        message: "Enter your GitHub username: ",
        name: "username"
      },
    {
        type: "list",
        mesage: "Select your preferred color: ",
        choices: ["green", "blue", "pink", "red"],
        name: "color"
    }
];

function init() {

    inquirer.prompt(questions)
    .then(function({username, color}) {
        const queryURL = `https://api.github.com/users/${username}`;
        axios.get(queryURL)
        .then((response) => {

            let photo = response.data.avatar_url;
            let name = response.data.login;
            let location = response.data.location;
            let company = response.data.company;
            let profile = response.data.html_url;
            let blog = response.data.blog;
            let bio = response.data.bio;
            let repos = response.data.public_repos;
            let followers = response.data.followers;
            let following = response.data.following;

            console.log(photo, name, location, company, profile, blog, bio, repos, followers, following);

            const html = generateHTML({color, photo, name, location, company, profile, blog, bio, repos, followers, following });
           
            pdf.create(html, options).toFile('./resume.pdf', function(err, res) {
                if (err) return console.log(err);
                console.log(res.filename); 
              }); 
        }) 
          .catch((err) => {
             console.log(err);
             process.exit(1);
         })
    })
}

init();
