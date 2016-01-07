'use strict';

describe('Trello Export CLI', function () {
    
    describe('given an invalid command', function () {
        
        it('should throw an error to the console', function () {
           process.argv = ['node', '../../lib/trelloexport-cli', './json.json', 'badcmd'];
           
           var cli = require('../../lib/trelloexport-cli');
           
           expect(function() { cli.run(); }).toThrow(new Error('badcmd is an invalid command.'));
        });
        
    });
    
    describe('given a valid command', function () {
        
        it('should call the given command with the user arguments', function () {
           var trelloexportSpy = {
               list: jasmine.createSpy()
           }
           process.argv = ['node', '../../lib/trelloexport-cli', './json.json', 'list'];
           
           require('../../lib/trelloexport-cli').run(trelloexportSpy);
           
           expect(trelloexportSpy.list).toHaveBeenCalled();
        });
        
    });
    
});