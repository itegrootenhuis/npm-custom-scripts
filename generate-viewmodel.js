var prompt = require('prompt');
var createFile = require('create-file');
var find = require('find');

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
    console.log('Command-line input received:');
    console.log('  prefix: ' + result.prefix);
    console.log('  File Name will be : ' + result.prefix+'ViewModel');

    generateFile(getViewModelPath(result.projectPath), result.prefix+'ViewModel.cs');
  });


  getViewModelPath = function (projectPath) { 
    find.file(projectPath, function(files){
      // console.log(files)
      files.forEach(file => {
        console.log('in loop ', file)
        if(file.includes('*.Web\\ViewModels\\')){
          console.log('condition met ', file);
        }
      });
    });
  }


  generateFile = function (path, fileName) {
    console.log('genfile')
    // createFile(path +'/'+ fileName, '', function(err){
      
    // });
  }