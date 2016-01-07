var proxyquire = require('proxyquire');

describe('Trello Export', function () {
    
    var trelloexport = require('../../lib/trelloexport');
    
    describe ('given a config object with a Trello JSON Export filename', function () {
       
       describe('where the given file does not exist', function () {
           
           it('should throw an error', function () {
               var input = {jsonFile: './foo.json', args: ['listname']};
               
               expect(function () { trelloexport.list(input); }).toThrow(new Error('Could not parse ./foo.json'));
           });
           
       });
       
       describe('where the given file does exist', function () {
          
          describe('exporting a list of cards', function () {
              
              beforeEach(function () {
                //setup json mock
                trelloexport = proxyquire('../../lib/trelloexport', 
                    { './foo.json' :
                        {
                            lists: 
                                [
                                    {
                                        id: '123456abcdef',
                                        name: 'foo'
                                    },
                                    {
                                        id: 'abcdef123456',
                                        name: 'bar'
                                    },
                                ],
                            cards:
                                [
                                    {
                                        idList: '123456abcdef',
                                        name: 'fooCard1'
                                    },
                                    {
                                        idList: 'abcdef123456',
                                        name: 'barCard1'
                                    },
                                    {
                                        idList: '123456abcdef',
                                        name: 'fooCard2'
                                    },
                                ],
                            '@noCallThru': true    
                        }
                    }
                );
              });
              
              describe('given a list name', function () {
                 
                 describe('where the list exists in the export', function () {
                    
                    it('should return a list of the card names in the list', function () {
                        var input = {jsonFile: './foo.json', args: ['foo']};
                        var expected = ['fooCard1', 'fooCard2'];
                        
                        var actual = trelloexport.list(input);
                        
                        expect(actual).toEqual(expected);
                    });
                     
                 });
                 
                 describe('where the list does not exist in the export', function () {
                    
                    it('should throw an error', function () {
                        var input = {jsonFile: './foo.json', args: ['noList']};
                        
                        expect(function () { trelloexport.list(input); }).toThrow(new Error('Could not find list noList'));
                    });
                     
                 });
                  
              });
              
          });
           
       });
        
    });
    
});