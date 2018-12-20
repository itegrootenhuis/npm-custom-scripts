var exports = module.exports = {};
const promise = require('promise');
const dir = require('node-dir');


exports.getDirectoryPath = async function (projectRoot, targetFolder){
    return new promise(resolve => {
      
      dir.subdirs(projectRoot, function(err, subdirs) {
        if (err) throw err;
  
        subdirs.forEach(subdir => {
          if(subdir.includes(targetFolder)){
            resolve(subdir)
          }
        });
      });
    });
}


// class Helpers{
//   static async getDirectoryPath(projectRoot, targetFolder){
//     return new promise(resolve => {
  
//       dir.subdirs(projectRoot, function(err, subdirs) {
//         if (err) throw err;
  
//         subdirs.forEach(subdir => {
//           if(subdir.includes(targetFolder)){
//             resolve(subdir)
//           }
//         });
//       });
//     });
//   }
// }

// export default Helpers