var exports           = module.exports = {};
const replace         = require('replace-in-file');
const helpers         = require('./utilities/index');
// const templateFolder  = './templates'; //=====LOCAL
const templateFolder  = 'S:\\VSTemplates\\Templates\\MVC'; // ======WORK


exports.getTemplate = async function(templateName, projectRoot, fileType, baseClassName){
  let targetPath    = await helpers.dirPath.getDirectoryPath(projectRoot, fileType);   
  let templatePath  = await helpers.dirPath.getDirectoryPath(templateFolder, fileType);
  let template      = templatePath + '\\' + templateName + '.*';

  console.log('fetching ' + fileType + ' template...');
  
  return new Promise (resolve => {
    resolve(helpers.copyFileUtil.copyFile(template, templateName, targetPath, baseClassName));
  });
}


exports.updateTemplate = async function(targetPath, templateName, baseClassName, baseNamespace, fileType){
  let fileExtension = await helpers.fsUtils.getFileExtension(templateName); 
  let options       = await helpers.fsUtils.replaceOptions(targetPath, templateName, fileExtension, baseClassName, baseNamespace);

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