/**
 * TrelloExport
 * https://github.com/skoberlink/TrelloExport
 * 
 * Copyright (c) 2016 Andrew Carlberg
 * 
 */

'use strict';

function loadJson(filename){
    return require(filename);
}

function getListIdByName(listName, lists) {
    var listId;
    for(var i = 0; i < lists.length; i++){
        if(lists[i].name === listName){
            listId = lists[i].id;
            break;
        }
    }
    
    if(listId){
        return listId;
    }
    else{
        throw new Error('Could not find list ' + listName);
    }
}

function getCardNamesByListId(listId, cards) {
    var cardNames = [];
    
    for(var i = 0; i < cards.length; i++){
        if(cards[i].idList === listId){
            cardNames.push(cards[i].name);
        }
    }
    
    return cardNames;
}

module.exports.list = function (config) {
    var trelloJson = loadJson(config.jsonFile);
    var listName = config.args[0];
    
    var listId = getListIdByName(listName, trelloJson.lists);
    
    if(listId){
        return getCardNamesByListId(listId, trelloJson.cards);
    }
};