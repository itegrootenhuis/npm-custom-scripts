var createFile = require('create-file');
var promise = require('promise');
var dir = require('node-dir');

var projectPath, prefix;

generateFile(projectPath, prefix+'Populater.cs');


async function generateFile(projectPath, fileName) {
  var viewModelPath = await getViewModelPath(projectPath)
  
  createFile(viewModelPath +'/'+ fileName, '', function(err){
    if (err) throw err;

    console.log("Successfully created " + fileName + "!")
  });
}


async function getViewModelPath(projectPath){
  return new promise(resolve => {

    dir.subdirs(projectPath, function(err, subdirs) {
      if (err) throw err;

      subdirs.forEach(subdir => {
        if(subdir.includes('Populater')){
          resolve(subdir)
        }
      });

    });
  });
}
  