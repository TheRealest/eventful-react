var getNodeId = require('./getNodeId');
var parseIdString = require('./parseIdString');

var virtualDOM = {};

var registerComponent = function(componentInstance) {
  var address = parseIdString(getNodeId(componentInstance));
};

module.exports = {
  registerComponent: registerComponent
};