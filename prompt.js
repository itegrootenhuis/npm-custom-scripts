var prompt = require('prompt');


var schema = {
    properties: {
        prefix: {
        reuired: true,
        type: 'string'
        },
        projectPath:{
        reuired: true,
        type: 'string'
        }
    }
}

prompt.start();

prompt.get(schema, function (err, result) {
    generateFile(result.projectPath, result.prefix+'ViewModel.cs');
});