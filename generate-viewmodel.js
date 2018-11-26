var prompt = require('prompt');
var createFile = require('create-file');
var find = require('find');
var forEach = require('async-foreach').forEach;

var schema = {
  properties: {
    prefix: {
      reuired: true,
      type: 'string'
    },
    projectPath:{
      reuired: true,
      type: 'string'
    }
  }
}
 
  //
  // Start the prompt
  //
  prompt.start();
 
  //
  // Get two properties from the user: username and email
  //
  prompt.get(schema, function (err, result) {
    //
    // Log the results.
    //
    // console.log('Command-line input received:');
    // console.log('  prefix: ' + result.prefix);
    // console.log('  File Name will be : ' + result.prefix+'ViewModel');
    
    generateFile(getViewModelPath(result.projectPath), result.prefix+'ViewModel.cs');
  });


  getViewModelPath = function (projectPath) { 
    console.log('***PATH***')
    var viewModelFolderPath;
    var regex = /^(.*[\\\/])/;

    find.file(projectPath, function(files) {
      forEach(files, function(file){
        console.log(file)
        if(file.includes('.Web\\ViewModels\\')) {
          console.log('made it', file)
          viewModelFolderPath = file.match(regex).input;
          console.log('path', viewModelFolderPath)
        }
      })

      if(viewModelFolderPath != null){
        console.log('return')
        return viewModelFolderPath
      }
    });
    // return 'C:\\Users\\itegrootenhuis\\Documents\\BZS\\npm-test-project\\Test.Web\\ViewModels'
  }


  generateFile = function (path, fileName) {
    console.log('***GEN FILE***')
    console.log(path, fileName)
    // createFile(path +'/'+ fileName, '', function(err){
      
    // });
  }