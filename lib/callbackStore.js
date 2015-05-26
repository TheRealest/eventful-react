var create = function() {
  return {
    callbacks: {},
    registerCallback: registerCallback,
    respondToEvent: respondToEvent,
    clearCallbacks: clearCallbacks
  };
};

var registerCallback = function(event, callback) {
  if (!this.callbacks[event]) this.callbacks[event] = [];
  this.callbacks[event].push(callback);
};

var respondToEvent = function(event, args) {
  if (this.callbacks[event]) {
    this.callbacks[event].forEach(function(callback) {
      callback.apply(null,args);
    });
  }
};

var clearCallbacks = function() {
  this.callbacks = {};
};

module.exports = {
  create: create
};