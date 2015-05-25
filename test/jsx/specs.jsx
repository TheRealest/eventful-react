var mocha = require('mocha');
var expect = require('chai').expect;
var jsdom = require('jsdom').jsdom;
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;
global.navigator = window.navigator;

var React = require('react');
var eventful = require('../../eventful-react');


describe('jsdom', function() {
  it('creates a document', function() {
    var div = document.createElement('div');
    expect(div.nodeName).to.eql('DIV');
  });
});

describe('eventful-react', function() {
  beforeEach(function() {
    console.log(window);
    console.log(document.body.children);
  });

  describe('bootstrapping process', function() {
    it('should add a .emit method to every component', function() {
      var Root = React.createClass({
        render: function() {
          return <div id="root"></div>;
        }
      });

      console.log('window:',window);
      React.render(<Root />, window.document.body);

      expect(document.querySelector('#root')).to.not.be.null;
    });

    it('should add a .on method to every component', function() {

    });
  });
});