/**
 * TrelloExport
 * https://github.com/skoberlink/TrelloExport
 * 
 * Copyright (c) 2016 Andrew Carlberg
 * 
 */

'use strict';

//cli module

function processArgs() {
    var userArgs = process.argv.slice(2);
    
    return {
        cmd: userArgs[1],
        jsonFile: userArgs[0],
        args: userArgs.slice(2)
    };
}

exports.run = function (trelloexport){
    trelloexport = (trelloexport) || require('../lib/trelloexport');
    
    var config = processArgs();

    var output = '';
    switch (config.cmd) {
        case 'list':
            output = trelloexport.list(config);
            break;
    
        default:
            throw new Error(config.cmd + ' is an invalid command.');
    }
    
    for(var i = 0; i < output.length; i++){
        console.log(output[i]);
    }
};