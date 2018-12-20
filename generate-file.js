var exports = module.exports = {};
const createFile = require('create-file');
const copy = require('copy');
const dir = require('node-dir');
const promise = require('promise');
const replace = require('replace-in-file');

//todo: pull this function into a utility and update it to accept both viewmodel and populater
async function getViewModelDirectoryPath(projectRoot){
  return new promise(resolve => {

    dir.subdirs(projectRoot, function(err, subdirs) {
      if (err) throw err;

      subdirs.forEach(subdir => {
        if(subdir.includes('ViewModels')){
          resolve(subdir)
        }
      });
    });
  });
}

exports.getTemplate = async function(templateName, projectRoot){
  let targetPath = await getViewModelDirectoryPath(projectRoot);
  let templatePath = await getViewModelDirectoryPath('D:/BZS/npm-custom-scripts/templates');

  console.log('fetching template...')
  
  return new Promise (resolve => {
    copy(templatePath + '\\' + templateName + '.*', targetPath, function(err, template){
      if(err) throw err;

      resolve(targetPath) 
    });  
  })
}


exports.updateTemplate = async function(targetPath, templateName, baseClassName, baseNamespace){
  //todo: rename file
  console.log('updating file...')
  return new Promise (resolve => {

    setTimeout(function(){
      const options = {
        files: targetPath + '\\' + templateName + '.cs',
        from: [/\$BaseClassName\$/g, /\$BaseNamespace\$/g],
        to: [baseClassName, baseNamespace]
      }
      
      replace(options)
      .then(changes => {
        console.log('updated files:  ', changes)
        resolve('ViewModel updated success!');
      })
      .catch(err => {
        console.log('Error occured: ', err)
      })
    }, 2000);
  })
}