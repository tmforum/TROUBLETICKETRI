'use strict';

exports.hubCreate = function(args, res, next) {
  /**
   * parameters expected in the args:
  * hub (Hub)
  **/
    var examples = {};
  examples['application/json'] = {
  "query" : "aeiou",
  "callback" : "aeiou",
  "id" : "aeiou"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.hubDelete = function(args, res, next) {
  /**
   * parameters expected in the args:
  * hubId (String)
  **/
  // no response value expected for this operation
  res.end();
}

exports.hubFind = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = [ {
  "query" : "aeiou",
  "callback" : "aeiou",
  "id" : "aeiou"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.hubGet = function(args, res, next) {
  /**
   * parameters expected in the args:
  * hubId (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "query" : "aeiou",
  "callback" : "aeiou",
  "id" : "aeiou"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

