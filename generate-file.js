var exports           = module.exports = {};
const { execFile }    = require('child_process');
const replace         = require('replace-in-file');
const helpers         = require('./utilities/index');
// const templateFolder  = './templates'; //=====LOCAL
const { spawnSync } = require('child_process');
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
            resolve(helpers.fsUtils.renameFile(targetPath, templateName, baseClassName, fileType, fileExtension));
          }

        })
        .catch(err => {
          console.log('Error occured: ', err)
        });
    }, 2000);
  })
}



exports.getPageTypeCode = async function(pageTypeClassName, pageTypeNamespace, projectRoot, baseNamespace){
  console.log('Fetching page type code...')
  let appPath = 'C:\\Users\\itegrootenhuis\\Documents\\BZS\\PageTypeGenerator\\PageTypeApp\\bin\\Debug\\PageTypeApp.exe';
  let connectionStringPath = await helpers.dirPath.getDirectoryPath(projectRoot, baseNamespace + '.Web');
  let connectionString = await helpers.fsUtils.getConnectionString(await connectionStringPath);
  let kenticoDllRoot = await helpers.dirPath.getDirectoryPath(projectRoot, 'CMS\\bin');
  kenticoDllRoot = kenticoDllRoot + '\\';

  return new Promise(resolve => {
    ls = spawnSync( appPath, [pageTypeClassName, pageTypeNamespace, kenticoDllRoot, projectRoot, connectionString] );
    // console.log( `stderr: ${ls.stderr.toString()}` );
    // console.log( `stdout: ${ls.stdout.toString()}` );
    if(`${ls.stdout.toString()}`){
      console.log('Page type code fetched!')
      resolve(`${ls.stdout.toString()}`)
    }
  });

  
  //call the pageTypeGenerator.exe with the parameters (pageTypeClassName, pageTypeNamespace, kenticoDllRoot, projectRoot, connectionString)
  //build utility to get an array of properties from the pageTypeCode; save array for later when building the viewModel
  //save pageTypeCode in the .Core project 
  
    //update namespace if needed (first try to figure out a way in the exe file)
  
  
  //return confirmation message or error message
}


exports.savePagetype = async function(projectRoot, pageTypeCode){
  let targetFolder = 'Models\\PageTypes';
  let fileLocation = await helpers.dirPath.getDirectoryPath(projectRoot, targetFolder);
  fileLocation = fileLocation + '\\'
  

  return new Promise(resolve => {
    let message = helpers.fsUtils.savePagetype(fileLocation, pageTypeCode);
    resolve(message);

    // resolve(await helpers.fsUtils.savePagetype(await helpers.dirPath(projectRoot, targetFolder), pageTypeCode));
  })
}
