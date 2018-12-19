// const prompt = require('./prompt.js');
const genViewModel = require('./generate-viewmodel');
const genPopulater = require('./generate-populater');
// const generateFile = require('./generate-file.js');
const inquirer = require('inquirer');

let questions = [
    {type: 'input', name: 'baseClassName',      message: 'Enter the baseClassName'},
    {type: 'input', name: 'baseNamespace',      message: 'Enter the baseNamespace'},
    {type: 'input', name: 'projectRoot',        message: 'Enter the project root'},
    {type: 'list',  name: 'populaterTemplate',  message: 'Choose a template for the populater', choices: ['$BaseClassName$Populater', '$BaseClassName$LandingPopulater(future template)']},
    {type: 'list',  name: 'viewModelTemplate',  message: 'Choose a template for the viewModel', choices: ['$BaseClassName$ViewModel', '$BaseClassName$LandingViewModel(future template)']},
];


inquirer.prompt(questions)
    .then(answers => buildFile(answers));


async function buildFile (answers){
    
    // await genPopulater.getTemplate(answers.populaterTemplate, answers.baseNamespace)
    //     .then(template => genPopulater.putTemplate(template, answers.projectRoot)
    //         .then(filePath => genPopulater.updatePopulater(filePath, answers.baseClassName))
    //             .then(message => console.log(message)));
    
    genViewModel.getTemplate(answers.viewModelTemplate, answers.baseNamespace)
        .then(template => genViewModel.putTemplate(template, answers.baseClassName, answers.projectRoot)
            .then(filePath => genViewModel.updatePopulater(filePath, baseClassName, answers.baseClassName))
                .then(message => console.log(message)));
    
    
    // generateFile.getTemplate(answers.populaterTemplate)
    //     .then(template => generateFile.putTemplate(template, answers.projectRoot)
    //         .then(filePath => generateFile.updatePopulater(filePath, answers.baseClassName))
    //             .then(message => console.log(message)));
}