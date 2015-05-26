var getNodeId = function(componentInstance) {
  return componentInstance._reactInternalInstance._rootNodeID;
};

module.exports = getNodeId;