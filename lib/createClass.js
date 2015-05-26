var React = require('React');
var noop = require('./noop');
var virtualDOM = require('./virtualDOM');

var createClass = function(componentSpec) {
  var _componentDidMount = componentSpec.componentDidMount || noop;
  var componentDidMount = function() {
    virtualDOM.registerComponent(this);
    return _componentDidMount.apply(this,arguments);
  };

  componentSpec.componentDidMount = componentDidMount;
  componentSpec.emit = function(){};
  componentSpec.on = function(){};

  return React.createClass(componentSpec);
};

module.exports = createClass;