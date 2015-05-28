var React = require('react');
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

  var _componentWillUnmount = componentSpec.componentWillUnmount || noop;
  var componentWillUnmount = function() {
    virtualDOM.unregisterComponent(this);
    return _componentWillUnmount.apply(this,arguments);
  };

  componentSpec.componentDidMount = componentDidMount;
  componentSpec.componentWillUnmount = componentWillUnmount;
  componentSpec.emit = componentEmit;
  componentSpec.on = componentOn;

  return React.createClass(componentSpec);
};

module.exports = createClass;
