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
  console.log('Fetching PageType code...')
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
      console.log('Successfully feteched PageType code!')
      resolve(`${ls.stdout.toString()}`)
    }
    else{
      console.log('Could\'t find a PageType with the name ' + pageTypeClassName)
    }
  });
}


exports.savePagetype = async function(projectRoot, pageTypeClassName, pageTypeCode){
  let targetFolder = 'Models\\PageTypes';
  let fileLocation = await helpers.dirPath.getDirectoryPath(projectRoot, targetFolder);
  fileLocation = fileLocation + '\\'

  let file = fileLocation + pageTypeClassName + '.cs';
  
  
  return new Promise(resolve => {
    resolve(helpers.fsUtils.savePagetype(file, pageTypeCode));
  });
}
