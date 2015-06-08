var getNodeId = require('./getNodeId');
var callbackStore = require('./callbackStore');

var virtualDOM = {};

var registerComponent = function(componentInstance) {
  var address = parseIdString(getNodeId(componentInstance));
  var virtualNode = address.reduce(function(virtualNode, id) {
    if (!virtualNode[id]) {
      var newNode = {};
      newNode.callbackStore = callbackStore.create();
      virtualNode[id] = newNode;
    }
    return virtualNode[id];
  },virtualDOM);
};

var unregisterComponent = function(componentInstance) {
  var address = parseIdString(getNodeId(componentInstance));
  var id = getAddressId(address);
  var virtualNode = getVirtualNode(getParentAddress(address));
  if (virtualNode[id]) delete virtualNode[id];
};

var parseIdString = function(idString) {
  return idString.split('.').slice(1);
};

var getVirtualNode = function(address) {
  if (address === null) return virtualDOM;
  return address.reduce(function(virtualNode, id) {
    return virtualNode && virtualNode[id];
  },virtualDOM);
};

var getParentAddress = function(address) {
  return address && address.length > 1 ? address.slice(0,-1) : null;
};

var getAddressId = function(address) {
  return address.slice(-1)[0];
};

var resolveEvent = function(address, event, args) {
  var virtualNode = getVirtualNode(address);
  var store = virtualNode.callbackStore;
  store.respondToEvent(event,args);
  var parentAddress = getParentAddress(address);
  if (parentAddress !== null) resolveEvent(parentAddress, event, args);
};

var registerCallback = function(address, event, callback) {
  var virtualNode = getVirtualNode(address);
  var store = virtualNode.callbackStore;
  store.registerCallback(event,callback);
};


module.exports = {
  virtualDOM: virtualDOM,
  registerComponent: registerComponent,
  unregisterComponent: unregisterComponent,
  parseIdString: parseIdString,
  getVirtualNode: getVirtualNode,
  getParentAddress: getParentAddress,
  getAddressId: getAddressId,
  resolveEvent: resolveEvent,
  registerCallback: registerCallback
};
