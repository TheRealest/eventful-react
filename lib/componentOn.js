var getNodeId = require('./getNodeId');
var virtualDOM = require('./virtualDOM');

var componentOn = function(event, callback) {
  var address = virtualDOM.parseIdString(getNodeId(this));
  virtualDOM.registerCallback(address,event,callback);
};

module.exports = componentOn;