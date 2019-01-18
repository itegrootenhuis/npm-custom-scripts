var exports           = module.exports = {};
const helpers         = require('./utilities/index');
// const templateFolder  = './templates'; //=====LOCAL
const { spawnSync }   = require('child_process');
const templateFolder  = 'S:\\VSTemplates\\Templates\\MVC'; // ======WORK


exports.getTemplate = async function(templateName, projectRoot, fileType, baseClassName, baseNamespace){
  let targetFolder  =  baseNamespace + '.Web\\' + fileType;
  let targetPath    = await helpers.dirPath.getDirectoryPath(projectRoot, targetFolder);   
  let templatePath  = await helpers.dirPath.getDirectoryPath(templateFolder, fileType);
  let template      = templatePath + '\\' + templateName + '.*';

  console.log('fetching ' + fileType + ' template...');
  
  return new Promise (resolve => {
    resolve(helpers.copyFileUtil.copyFile(template, templateName, targetPath, baseClassName));
  });
}


exports.updateTemplate = async function(targetPath, templateName, baseClassName, baseNamespace, fileType){
  let replaceFroms  = [/\$BaseClassName\$/g, /\$baseclassname\$/g, /\$BaseClassNamePlural\$/g, /\$BaseNamespace\$/g];
  let replaceTos    = [baseClassName, baseClassName.toLowerCase(), baseClassName + 's', baseNamespace];
  let fileExtension = await helpers.fsUtils.getFileExtension(templateName); 
  let options       = await helpers.replaceUtils.replaceOptions(targetPath, templateName, fileExtension, baseClassName, replaceFroms, replaceTos);
  let results       = await helpers.replaceUtils.replaceInFile(options, fileType, fileExtension, false)

  console.log('updating file...')
  
  return new Promise (resolve => {
    setTimeout(async function(){
      if(results.includes('Renaming')){
        resolve(await helpers.fsUtils.renameFile(targetPath, templateName, baseClassName, fileType, fileExtension))
      }
      else{
        resolve(results);
      }
    }, 2000);
  })
}



exports.getPageTypeCode = async function(pageTypeClassName, pageTypeNamespace, projectRoot, baseNamespace){
  console.log('Fetching PageType code...')
  let appPath               = 'C:\\Users\\itegrootenhuis\\Documents\\BZS\\PageTypeGenerator\\PageTypeApp\\bin\\Debug\\PageTypeApp.exe';
  let connectionStringPath  = await helpers.dirPath.getDirectoryPath(projectRoot, baseNamespace + '.Web');
  let connectionString      = await helpers.fsUtils.getConnectionString(await connectionStringPath);
  let kenticoDllRoot        = await helpers.dirPath.getDirectoryPath(projectRoot, 'CMS\\bin');
  kenticoDllRoot            = kenticoDllRoot + '\\';

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
  let targetFolder    = 'Models\\PageTypes';
  let fileLocation    = await helpers.dirPath.getDirectoryPath(projectRoot, targetFolder);
  fileLocation        = fileLocation + '\\'
  pageTypeClassName   = pageTypeClassName.substring(pageTypeClassName.indexOf('.') + 1)
  let file            = fileLocation + pageTypeClassName + '.cs';
  
  
  return new Promise(async resolve => {
    resolve(await helpers.fsUtils.savePagetype(file, pageTypeCode));
  });
}


exports.updateNamespace = async function(filePath, pageTypeNamespace){
  let replaceFroms  = /\bCMS.DocumentEngine.Types.\b[^.]+\n/g;
  let replaceTos    = pageTypeNamespace + '\n';
  let options       = await helpers.replaceUtils.replaceOptions(null, null, null, null, replaceFroms, replaceTos, filePath);

  return new Promise(async resolve => {
    // console.log('trying to replace in file');
    
    resolve(await helpers.replaceUtils.replaceInFile(options, 'PageType', null, true));
  });
}
