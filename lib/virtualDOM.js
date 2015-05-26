var getNodeId = require('./getNodeId');
var parseIdString = require('./parseIdString');
var callbackStore = require('./callbackStore');

var virtualDOM = {};

var registerComponent = function(componentInstance) {
  var address = parseIdString(getNodeId(componentInstance));
  address.reduce(function(parent,id) {
    if (!parent[id]) {
      parent[id] = {
        parent: parent === virtualDOM ? null : parent,
        callbackStore: callbackStore.create(),
      };
    }
    return parent[id];
  },virtualDOM);
  // console.log(virtualDOM);
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