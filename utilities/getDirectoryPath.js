var exports = module.exports = {};
const dir = require('node-dir');


exports.getDirectoryPath = async function (projectRoot, targetFolder){
    return new Promise(resolve => {
      
      dir.subdirs(projectRoot, function(err, subdirs) {
        if (err) throw err;

        subdirs.forEach(subdir => {
          if(subdir.includes(targetFolder)){
            
            resolve(subdir);
          }
        });
      });
    });
}