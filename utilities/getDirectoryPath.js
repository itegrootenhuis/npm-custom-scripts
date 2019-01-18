var exports = module.exports = {};
const dir = require('node-dir');


exports.getDirectoryPath = async function (projectRoot, targetFolder){
    return new Promise(resolve => {

      dir.subdirs(projectRoot, function(err, subdirs) {
        if (err) throw err;
        
        subdirs.some(subdir => {
          if(subdir.includes(targetFolder) && !subdir.includes('.Test')){
            // console.log("++++++++++++++", subdir, targetFolder)
            resolve(subdir);
            return subdir.includes(targetFolder);
          }
        });
      });
    });
}