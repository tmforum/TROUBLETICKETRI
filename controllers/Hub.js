'use strict';

var url = require('url');


var Hub = require('./HubService');


module.exports.hubCreate = function hubCreate (req, res, next) {
  Hub.hubCreate(req.swagger.params, res, next);
};

module.exports.hubDelete = function hubDelete (req, res, next) {
  Hub.hubDelete(req.swagger.params, res, next);
};

module.exports.hubFind = function hubFind (req, res, next) {
  Hub.hubFind(req.swagger.params, res, next);
};

module.exports.hubGet = function hubGet (req, res, next) {
  Hub.hubGet(req.swagger.params, res, next);
};
