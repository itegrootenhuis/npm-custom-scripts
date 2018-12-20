var exports = module.exports = {};
const copy = require('copy');
// const dir = require('node-dir');
const fs = require('fs');
// const promise = require('promise');
const replace = require('replace-in-file');
const Helpers  = require('./utilities/getDirectoryPath');


exports.getTemplate = async function(templateName, projectRoot){
  let fileType = 'ViewModel'
  let targetPath = await Helpers.getDirectoryPath(projectRoot, fileType);   
  let templatePath = await Helpers.getDirectoryPath('D:/BZS/npm-custom-scripts/templates', fileType);

  console.log('fetching template...')
  
  return new Promise (resolve => {
    copy(templatePath + '\\' + templateName + '.*', targetPath, function(err, template){
      if(err) throw err;

      resolve(targetPath) 
    });  
  })
}


exports.updateTemplate = async function(targetPath, templateName, baseClassName, baseNamespace){
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

          fs.rename(targetPath + '\\' + templateName + '.cs', targetPath + '\\' + baseClassName + 'ViewModel.cs', (err) =>{
            if (err) throw err;

            resolve('ViewModel updated success!');
          });
        })
        .catch(err => {
          console.log('Error occured: ', err)
        });
    }, 2000);
  })
}