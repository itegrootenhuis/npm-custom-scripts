var exports     = module.exports = {};
const helpers   = require('./index');
const replace   = require('replace-in-file');

exports.replaceOptions = async function(targetPath, templateName, fileExtension, baseClassName, replaceFroms, replaceTos, file){
    if(file == null){
        if(fileExtension.includes('.cshtml')){
            file = targetPath + '\\' + baseClassName + '\\' + templateName + fileExtension;
        }
        else{
            file = targetPath + '\\' + templateName + fileExtension;
        }
    }
    
    return new Promise (resolve => {
        resolve(options = {
            files: file,
            from: replaceFroms, //[/\$BaseClassName\$/g, /\$baseclassname\$/g, /\$BaseClassNamePlural\$/g, /\$BaseNamespace\$/g],
            to:  replaceTos  //[baseClassName, baseClassName.toLowerCase(), baseClassName + 's', baseNamespace]
        });
    });
}


exports.replaceInFile = async function(options, fileType, fileExtension, isPageType){
    return new Promise(resolve => {
        replace(options)
            .then(changes => {
                console.log('files updated: ', changes)
                
                if(isPageType || fileExtension.includes('.cshtml')){
                    resolve(fileType + ' updated success!');
                }
                else{
                    resolve('Renaming ' + fileType);
                }
            
            })
            .catch(err => {
                console.log('Error occured: ', err)
            });
    })
}