var React = require('React');
var virtualDOM = require('./virtualDOM');

var noop = require('./noop');
var componentEmit = require('./componentEmit');
var componentOn = require('./componentOn');

var createClass = function(componentSpec) {
  var _componentDidMount = componentSpec.componentDidMount || noop;
  var componentDidMount = function() {
    virtualDOM.registerComponent(this);
    return _componentDidMount.apply(this,arguments);
  };

  componentSpec.componentDidMount = componentDidMount;
  componentSpec.emit = componentEmit;
  componentSpec.on = componentOn;

  return React.createClass(componentSpec);
};

module.exports = createClass;