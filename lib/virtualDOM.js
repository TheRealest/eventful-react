var getNodeId = require('./getNodeId');
var parseIdString = require('./parseIdString');

var virtualDOM = {};

var registerComponent = function(componentInstance) {
  var address = parseIdString(getNodeId(componentInstance));
  // console.log(address);
};

var resolveEvent = function(address, event, args) {};

var registerCallback = function(address, event, callback) {};

var create 

module.exports = {
  virtualDOM: virtualDOM,
  registerComponent: registerComponent,
  resolveEvent: resolveEvent,
  registerCallback: registerCallback
};