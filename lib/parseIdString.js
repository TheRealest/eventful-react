var parseIdString = function(idString) {
  return idString.split('.').slice(1);
};

module.exports = parseIdString;