var exports           = module.exports = {};
const copy            = require('copy');
const fs              = require('fs');
const replace         = require('replace-in-file');
const Helpers         = require('./utilities/getDirectoryPath');
const templateFolder  = 'S:\\VSTemplates\\Templates\\MVC';

//TODO:
// views target path needs to add a folder to the project to hold the views.


exports.getTemplate = async function(templateName, projectRoot, fileType){
  let targetPath    = await Helpers.getDirectoryPath(projectRoot, fileType);   
  let templatePath  = await Helpers.getDirectoryPath(templateFolder, fileType);
  let template      = templatePath + '\\' + templateName + '.*';

  console.log('fetching ' + fileType + ' template...');
  
  return new Promise (resolve => {
    copy(template, targetPath, function(err){
      if(err) throw err;

      resolve(targetPath) 
    });  
  })
}


exports.updateTemplate = async function(targetPath, templateName, baseClassName, baseNamespace, fileType){
  var fileExtension //todo - get file extension utility
  
  if(templateName.includes('Index') || templateName.includes('Detail')){
    fileExtension = '.cshtml';
  }
  else{
    fileExtension = '.cs'
  }
  
  //todo - figure out where to user ToLower() when replacing stuff into the view
  const options = {
    files: targetPath + '\\' + templateName + fileExtension,
    from: [/\$BaseClassName\$/g, /\$BaseNamespace\$/g],
    to: [baseClassName, baseNamespace]
  }

  console.log('updating file...')
  
  return new Promise (resolve => {
    setTimeout(function(){
      replace(options)
        .then(changes => {
          console.log('files updated: ', changes)
          //todo - rename file uitility
          fs.rename(
            targetPath + '\\' + templateName + fileExtension,
            targetPath + '\\' + baseClassName + fileType + fileExtension, 
            (err) =>{
              if (err) throw err;

              resolve(fileType + ' updated success!');
          });

        })
        .catch(err => {
          console.log('Error occured: ', err)
        });
    }, 2000);
  })
}