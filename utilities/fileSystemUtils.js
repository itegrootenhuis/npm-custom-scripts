var exports = module.exports = {};
const fs    = require('fs');

exports.getFileExtension = async function (templateName){
    return new Promise(resolve => {
        if(templateName.includes('Index') || templateName.includes('Detail')){
            resolve('.cshtml');
        }
        else{
            resolve('.cs');
        }
    });
}

exports.replaceOptions = async function(targetPath, templateName, fileExtension, baseClassName, baseNamespace){
    var file;

    if(fileExtension.includes('.cshtml')){
        file = targetPath + '\\' + baseClassName + '\\' + templateName + fileExtension;
    }
    else{
        file = targetPath + '\\' + templateName + fileExtension;
    }
    
    return new Promise (resolve => {
        resolve(options = {
            files: file,
            from: [/\$BaseClassName\$/g, /\$baseclassname\$/g, /\$BaseClassNamePlural\$/g, /\$BaseNamespace\$/g],
            to: [baseClassName, baseClassName.toLowerCase(), baseClassName + 's', baseNamespace]
        });
    });
}

exports.renameFile = async function (targetPath, templateName, baseClassName, fileType, fileExtension){
    return new promise(resolve => {
        fs.rename(
            targetPath + '\\' + templateName + fileExtension,
            targetPath + '\\' + baseClassName + fileType + fileExtension, 
            (err) =>{
              if (err) throw err;
        
              resolve(fileType + ' updated success!');
          });
    });
}