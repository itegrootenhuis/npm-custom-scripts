var exports = module.exports = {};
const dir = require('node-dir');
const promise = require('promise');


exports.getDirectoryPath = async function (projectRoot, targetFolder){
    return new promise(resolve => {
      
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