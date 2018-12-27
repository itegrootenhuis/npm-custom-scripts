var exports           = module.exports = {};
const copy            = require('copy');
const fs              = require('fs');
const replace         = require('replace-in-file');
const helpers         = require('./utilities/index');
const templateFolder  = './templates'; //=====LOCAL
//const templateFolder  = 'S:\\VSTemplates\\Templates\\MVC'; // ======WORK

//TODO:
// views target path needs to add a folder to the project to hold the views.


exports.getTemplate = async function(templateName, projectRoot, fileType, baseClassName){
  let targetPath    = await helpers.dirPath.getDirectoryPath(projectRoot, fileType);   
  let templatePath  = await helpers.dirPath.getDirectoryPath(templateFolder, fileType);
  let template      = templatePath + '\\' + templateName + '.*';

  console.log('fetching ' + fileType + ' template...');
  
  return new Promise (resolve => {
    if (templateName.includes('Index') || templateName.includes('Detail')){
      helpers.fileUtils.createFolder(targetPath, baseClassName);
    }
    //todo: change templatePath to account for view folder
    copy(template, targetPath, function(err){
      if(err) throw err;

      resolve(targetPath) 
    });  
  })
}


exports.updateTemplate = async function(targetPath, templateName, baseClassName, baseNamespace, fileType){
  var fileExtension = await helpers.fileUtils.getFileExtension(templateName); 
  const options = await helpers.fileUtils.fsOptions(targetPath, templateName, fileExtension, baseClassName, baseNamespace);

  console.log('updating file...')
  
  return new Promise (resolve => {
    setTimeout(function(){
      replace(options)
        .then(changes => {
          console.log('files updated: ', changes)

          if(fileExtension.includes('.cshtml')){
            resolve(fileType + ' updated success!');
          }
          else{
            resolve(helpers.fileUtils.renameFile(targetPath, templateName, baseClassName, fileType, fileExtension));
          }

        })
        .catch(err => {
          console.log('Error occured: ', err)
        });
    }, 2000);
  })
}