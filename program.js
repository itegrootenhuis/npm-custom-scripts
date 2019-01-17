const generateFile          = require('./generate-file.js');
const inquirer              = require('inquirer');
const populaterFolderName   = 'Populaters';
const viewFolderName        = 'Views';
const viewModelFolderName   = 'ViewModels';


let questions = [
    {type: 'input', name: 'baseClassName',      message: 'Enter the baseClassName', validate: answer => { return new Promise (resolve => resolve(notNull(answer, 'BaseClassName is required'))) }},
    {type: 'input', name: 'baseNamespace',      message: 'Enter the baseNamespace', validate: answer => { return new Promise (resolve => resolve(notNull(answer, 'BaseNamespace is required'))) }},
    {type: 'input', name: 'projectRoot',        message: 'Enter the project root (right click to paste)', validate: answer => { return new Promise (resolve => resolve(notNull(answer, 'Project root is required'))) }},
    {type: 'input', name: 'pageTypeClassName',  message: 'Enter the pageType class name (right click to paste)', validate: answer => { return new Promise (resolve => resolve(notNull(answer, 'PageType class name is required'))) }},
    {type: 'input', name: 'pageTypeNamespace',  message: 'Enter the pageType namespace (right click to paste)', validate: answer => { return new Promise (resolve => resolve(notNull(answer, 'PageType namespace is required'))) }},
    {type: 'list',  name: 'populaterTemplate',  message: 'Choose a template for the populater', choices: ['$BaseClassName$Populater', '$BaseClassName$LandingPopulater']},
    {type: 'list',  name: 'viewTemplate',       message: 'Choose a template for the view',      choices: ['Detail', 'Index']},
    {type: 'list',  name: 'viewModelTemplate',  message: 'Choose a template for the viewModel', choices: ['$BaseClassName$ViewModel', '$BaseClassName$LandingViewModel']},
];


inquirer.prompt(questions)
    .then(answers => Promise.all([
        getPageTypeCode(answers), 
        // buildFile(answers, populaterFolderName), 
        // buildFile(answers, viewFolderName),
        // buildFile(answers, viewModelFolderName)
    ]));


async function getPageTypeCode (answers){
    return generateFile.getPageTypeCode(answers.pageTypeClassName, answers.pageTypeNamespace, answers.projectRoot, answers.baseNamespace)
        .then(pageTypeCode => generateFile.savePagetype(answers.projectRoot, answers.pageTypeClassName, pageTypeCode))
            .then(message => console.log("final: ", message));
}


async function buildFile (answers, fileType){
    if(fileType === 'Populaters'){
        return generateFile.getTemplate(answers.populaterTemplate, answers.projectRoot, fileType, answers.baseClassName)
            .then(targetPath => generateFile.updateTemplate(targetPath, answers.populaterTemplate, answers.baseClassName, answers.baseNamespace, fileType))
                .then(message => console.log(message));
        
    }
    else if(fileType === 'Views'){
        return generateFile.getTemplate(answers.viewTemplate, answers.projectRoot, fileType, answers.baseClassName)
            .then(targetPath => generateFile.updateTemplate(targetPath, answers.viewTemplate, answers.baseClassName, answers.baseNamespace, fileType))
                .then(message => console.log(message));
    }
    else if(fileType === 'ViewModels'){
        return generateFile.getTemplate(answers.viewModelTemplate, answers.projectRoot, fileType, answers.baseClassName)
            .then(targetPath => generateFile.updateTemplate(targetPath, answers.viewModelTemplate, answers.baseClassName, answers.baseNamespace, fileType))
                .then(message => console.log(message));
    }
}


async function notNull(answer, errorMessage){
    return new Promise(resolve => {
        if(answer){
            resolve(true);
        }
        else{
            resolve(errorMessage);
        }
    });
}