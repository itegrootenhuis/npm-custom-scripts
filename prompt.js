var exports = module.exports = {};
var inquirer = require('inquirer');

let questions = [
    {type: 'input', name: 'baseClassName', message: 'Enter the baseClassName'},
    {type: 'input', name: 'projectRoot', message: 'Enter the project root'},
    {type: 'list',  name: 'populaterTemplate', message: 'Choose a template for the populater', choices: ['$BaseClassName$Populater', '$BaseClassName$LandingPopulater(future template)']},
    {type: 'list',  name: 'viewModelTemplate', message: 'Choose a template for the viewModel', choices: ['$BaseClassName$ViewModel', '$BaseClassName$LandingViewModel(future template)']},
];

exports.response = async function(){
    inquirer.prompt(questions)
    .then(answers => {
        return answers
    });
}