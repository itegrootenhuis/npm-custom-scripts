var exports     = module.exports = {};
var extract     = require('extract-string');
const fs        = require('fs');
const regex     = /([^\$]+$)/g;


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

exports.renameFile = async function (targetPath, templateName, baseClassName, fileType, fileExtension){
    let oldPath = await getOldPath(targetPath, templateName, fileExtension);
    let newPath = await getNewPath(targetPath, baseClassName, templateName, fileExtension);

    return new Promise(async resolve => {
        fs.rename(
            oldPath,
            newPath,
            (err) =>{
              if (err) throw err;
        
              resolve(fileType + ' updated success!');
            });
    });
}

async function getOldPath(targetPath, templateName, fileExtension){
    return new Promise (resolve => {
        resolve(targetPath + '\\' + templateName + fileExtension);
    });
}

async function getNewPath(targetPath, baseClassName, templateName, fileExtension){
    let fileName = templateName.match(regex);

    return new Promise(resolve => {
        resolve(targetPath + '\\' + baseClassName + fileName + fileExtension);
    });
}


exports.getConnectionString = async function(connectionStringPath){
    return new Promise(resolve => {
        fs.readdir(connectionStringPath, function(err, items){
            if(err) throw err;

            items.forEach(item => {
                if(item == 'Web.config'){
                    fs.readFile(connectionStringPath + '\\' + item, 'utf8', function(err, data){
                        if(err) throw err;

                        var config = extract(data)
                            .pattern('connectionString="{connectionString}"');

                        resolve(config[0].connectionString);
                    });
                }
            });
        });
    });
}

exports.savePagetype = async function(file, pageTypeCode){
    return new Promise(resolve => {
        try{
            fs.appendFileSync(file, pageTypeCode, 'utf8');
            resolve(file);
        }
        catch(err){
            if(err) throw(err);
        }
    });
}