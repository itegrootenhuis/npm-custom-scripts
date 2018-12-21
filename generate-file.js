var exports = module.exports = {};
const copy = require('copy');
const fs = require('fs');
const replace = require('replace-in-file');
const Helpers  = require('./utilities/getDirectoryPath');
const templateFolder = './templates'


exports.getTemplate = async function(templateName, projectRoot, fileType){
  let targetPath = await Helpers.getDirectoryPath(projectRoot, fileType);   
  let templatePath = await Helpers.getDirectoryPath(templateFolder, fileType);

  console.log('fetching ' + fileType + ' template...')
  
  return new Promise (resolve => {
    copy(templatePath + '\\' + templateName + '.*', targetPath, function(err){
      if(err) throw err;

      resolve(targetPath) 
    });  
  })
}


exports.updateTemplate = async function(targetPath, templateName, baseClassName, baseNamespace, fileType){
  const options = {
    files: targetPath + '\\' + templateName + '.cs',
    from: [/\$BaseClassName\$/g, /\$BaseNamespace\$/g],
    to: [baseClassName, baseNamespace]
  }

  console.log('updating file...')
  
  return new Promise (resolve => {
    setTimeout(function(){
      replace(options)
        .then(changes => {
          console.log('files updated: ', changes)

          fs.rename(targetPath + '\\' + templateName + '.cs', targetPath + '\\' + baseClassName + fileType +'.cs', (err) =>{
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