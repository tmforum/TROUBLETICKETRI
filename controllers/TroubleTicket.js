'use strict';

var url = require('url');


var TroubleTicket = require('./TroubleTicketService');


module.exports.troubleTicketCreate = function troubleTicketCreate (req, res, next) {
  TroubleTicket.troubleTicketCreate(req, res, next);
};

module.exports.troubleTicketFind = function troubleTicketFind (req, res, next) {
  TroubleTicket.troubleTicketFind(req, res, next);
};

module.exports.troubleTicketGet = function troubleTicketGet (req, res, next) {
  TroubleTicket.troubleTicketGet(req, res, next);
};

module.exports.troubleTicketPatch = function troubleTicketPatch (req, res, next) {
  TroubleTicket.troubleTicketPatch(req, res, next);
};

module.exports.troubleTicketUpdate = function troubleTicketUpdate (req, res, next) {
  TroubleTicket.troubleTicketUpdate(req, res, next);
};
