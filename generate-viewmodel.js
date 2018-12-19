var exports = module.exports = {};
const createFile = require('create-file');
const copy = require('copy');
const dir = require('node-dir');
const promise = require('promise');
const replace = require('replace-in-file');


// var projectPath, prefix;


// async function generateFile(projectPath, fileName) {
//   var viewModelPath = await getViewModelPath(projectPath)
  
//   createFile(viewModelPath +'/'+ fileName, '', function(err){
//     if (err) throw err;
    
//     console.log("Successfully created " + fileName + "!")
//   });
// }


async function getViewModelPath(projectRoot){
  return new promise(resolve => {
    console.log('getViewModelPath', projectRoot)

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


exports.getTemplate = async function(templateName, baseNamespace){
  let templatePath = '/templates/' + baseNamespace + '.Web/ViewModels/';


  console.log('getTemplate1: ', templateName + '.cs', templatePath)
  copy(templateName + '.cs', templatePath, function(err, template){
    // if(err) throw err;
    console.log('getTemplate2: ', template)
    return template
  });  
}

exports.putTemplate = async function(template, baseClassName, projectRoot){
  console.log('putTemplate: ', template, baseClassName, projectRoot)
  let filePath = await getViewModelPath(projectRoot);

  createFile(filePath +'/'+ baseClassName + 'ViewModel.cs', template, function(err){
    if(err) throw err;
  });
  // console.log('FILEPATH: ', filePath)
  return filePath
}

exports.updateTemplate = async function(filePath, baseClassName, baseNamespace){
  console.log('updateTemplate')
  var message;
  const options = {
    files: filePath,
    from: ['$BaseClassName$/g', '$BaseNamespace$/g'],
    to: [baseClassName, baseNamespace]
  }

  try {
    const changes = await replace(options); 
    console.log(changes)
    message = 'ViewModel generation success!'
  }
  catch(err){
    console.log(err)
  }

  return message;
}