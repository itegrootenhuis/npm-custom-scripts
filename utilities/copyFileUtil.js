var exports = module.exports = {};
const copy = require('copy');


exports.copyFile = async function (template, templateName, targetPath, baseClassName){
    return new Promise (resolve => {
        if (templateName.includes('Index') || templateName.includes('Detail')){
            copy(template, targetPath + '\\' + baseClassName, function(err){
                if(err) throw err;
            
                resolve(targetPath) 
            });
        }
        else{
            copy(template, targetPath, function(err){
                if(err) throw err;
            
                resolve(targetPath) 
            });
        }
    });
}