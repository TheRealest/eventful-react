var React = require('React');

var createClass = function(componentSpec) {
  var _componentDidMount = componentSpec.componentDidMount
  var componentDidMount = function() {
    console.log('eventful componentDidMount:',this._reactInternalInstance._rootNodeID);
    return _componentDidMount.apply(this,arguments);
  };

  componentSpec.componentDidMount = componentDidMount;

  return React.createClass(componentSpec);
};

module.exports = createClass;