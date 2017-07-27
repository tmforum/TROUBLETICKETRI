'use strict';

//Minimal Service with filtering (equality match only) and attribute selection
//Error Handing Need to define a global error hqndler
//Paging and Range based Iterator to be added
//Notification to be added add listener and implement hub

var config = require('./config.json');

var util = require('util');

var uuid = require('node-uuid');

var mongoUtils = require('../utilities/mongoUtils')

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Mongo URL

var argv = require('minimist')(process.argv);
var dbhost = argv.dbhost ? argv.dbhost: config.db_host;


const mongourl = config.db_prot + "://" + dbhost + ":" + config.db_port + "/" + config.db_name;

console.log(mongourl);




exports.troubleTicketCreate = function (req, res, next) {
    /**
     * parameters expected in the args:
     * troubleTicket (TroubleTicket)
     **/
    var args = req.swagger.params;
    
    var troubleTicket = args.troubleTicket.value;
    
    if (troubleTicket.id == undefined) {
        troubleTicket.id = uuid.v4();
    }
    
    
    
    var self = req.url + "/" + troubleTicket.id;
    
    
    troubleTicket.href = req.headers.origin + self;
    
    // Use connect method to connect to the server
    MongoClient.connect(mongourl, function (err, db) {
        assert.equal(null, err);
        
        // Get the documents collection
        var collection = db.collection('troubleTicket');
        // Insert some documents
        collection.insert(troubleTicket, function (err, result) {
            assert.equal(err, null)
        });
        db.close();
    });
    
    
    
    res.setHeader('Content-Type', 'application/json');
    
    res.setHeader('Location', self);
    res.end(JSON.stringify(troubleTicket));
    
  
}

exports.troubleTicketFind = function (req, res, next) {
    /**
     * parameters expected in the args:
     * fields (String)
     **/
    
    var args = req.swagger.params;
    
    
    MongoClient.connect(mongourl, function (err, db) {
        try {
            assert.equal(null, err);
        }
        catch (err) {
            console.log(err)
        }
        
        
        
        
        // Get the documents collection and filtering ?
        
        var collection = db.collection('troubleTicket');
        
        
        
        // console.log(req)
        
        console.log(req.query);
        
        
        var queryToMongo = require('query-to-mongo')
        var query = queryToMongo(req.query)
        console.log(query)
        
        // Find some documents based on criteria plus attribute selection
        collection.find(query.criteria,
        mongoUtils.fieldFilter(args.fields.value)).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log(docs);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(docs));
            //res.json( docs );
        });
    })
}

exports.troubleTicketGet = function (req, res, next) {
    /**
     * parameters expected in the args:
     * troubleTicketId (String)
     * fields (String)
     **/
    
    var args = req.swagger.params;
   
    MongoClient.connect(mongourl, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection('troubleTicket');
        var troubleTicketId = String(req.swagger.params.troubleTicketId.value);
        
        const query = {
            id: troubleTicketId
        }
        
        
        collection.findOne(query, function (err, doc) {
            
            
            try {
            assert.equal(err, null);
            }
            catch (err) {
            
            console.log(err);
            
            res.statusCode = 500;
            var error = { };
            error = { 'code': 'ERR0001' , 'reason' : err , 'message:' : 'provide a different id' };
            res.end(JSON.stringify(error));
             }
            
            if (doc == null) {
                res.statusCode = 404;
                var error = {
                };
                error = {
                    'code':   'ERR0001', 'reason': 'not found', 'message:': 'provide a different id'
                };
                res.end(JSON.stringify(error));
            } else {
                res.setHeader('Content-Type', 'application/json');
                delete doc[ "_id"]
                
                res.end(JSON.stringify(doc));
            }
        })
    })
}

exports.troubleTicketPatch = function (req, res, next) {
    
    var args = req.swagger.params;
    /**
     * parameters expected in the args:
     * troubleTicketId (String)
     * troubleTicket (TroubleTicket)
     **/
    

    MongoClient.connect(mongourl, function (err, db) {
        assert.equal(null, err);
        var collection = db.collection('troubleTicket');
        
        var troubleTicket = req.swagger.params.troubleTicket.value;
        var troubleTicketId = String(req.swagger.params.troubleTicketId.value);
        
        
        
        const query = {
            id: troubleTicketId
        }
        
        var patchDoc = {
            $set: troubleTicket
        }
        
        collection.update(query, patchDoc, function (err, doc) {
            assert.equal(err, null);
            //res.json(doc);
            // Find one document
            collection.findOne(query, function (err, doc) {
                //doc = generateTroubleTicketDoc(doc);
                
                res.setHeader('Content-Type', 'application/json');
                delete doc[ "_id"]
                res.end(JSON.stringify(doc));
            })
        })
    })
}
//Same as patch with ID provided in the body 
exports.troubleTicketUpdate = function (req, res, next) {
    
    var args = req.swagger.params;
    /**
     * parameters expected in the args:
     * troubleTicketId (String)
     * troubleTicket (TroubleTicket)
     **/
   
    
    troubleTicketPatch(req, res, next);
    
}