#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const apiLink = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";
//to fetch data from API
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    //input from user
    let name = await inquirer.prompt([
        {
            name: "fname",
            type: "input",
            message: "Write your name:"
        }
    ]);
    for (let i = 1; i < 10; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt([
            {
                name: "quiz",
                type: "list",
                message: data[i].question,
                choices: answers.map((val) => val),
            }
        ]);
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.bold.blue("Correct"));
        }
        else {
            console.log(chalk.bold.red("Wrong "), `correct answer is ${data[i].correct_answer}`);
        }
    }
    console.log(`${chalk.bold.blueBright(name.fname)}, your score is ${chalk.bold.blueBright(score)} out of 10.`);
};
startQuiz();
