var getNodeId = require('./getNodeId');
var virtualDOM = require('./virtualDOM');

var componentEmit = function(event) {
  var address = virtualDOM.parseIdString(getNodeId(this));
  var args = Array.prototype.slice.call(arguments,1);
  virtualDOM.resolveEvent(address,event,args);
};

module.exports = componentEmit;