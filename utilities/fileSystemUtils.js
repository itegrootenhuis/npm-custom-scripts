var exports = module.exports = {};
const fs = require('fs');
const promise = require('promise');


exports.getFileExtension = async function (templateName){
    return new promise(resolve => {
        if(templateName.includes('Index') || templateName.includes('Detail')){
            resolve('.cshtml');
        }
        else{
            resolve('.cs');
        }
    });
}

exports.createFolder = async function (targetPath, baseClassName){
    fs.mkdir(targetPath + '\\' + baseClassName, function (err) { 
        if(err) throw err;
     });
}

exports.fsOptions = async function(targetPath, templateName, fileExtension, baseClassName, baseNamespace){
    return new Promise (resolve => {
        
        resolve(options = {
            files: targetPath + '\\' + templateName + fileExtension,
            from: [/\$BaseClassName\$/g, /\$baseclassname\$/g, /\$BaseNamespace\$/g],
            to: [baseClassName, baseClassName, baseNamespace]
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