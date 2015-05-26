var mocha = require('mocha');
var sinon = require('sinon');
var expect = require('chai').expect;
var jsdom = require('jsdom').jsdom;
global.document = jsdom();
global.window = document.parentWindow;
global.navigator = window.navigator;

var React = require('react');
require('react/addons');
var testUtils = React.addons.TestUtils;
var Eventful = require('../../eventful-react');


describe('jsdom', function() {
  it('creates a document', function() {
    var div = document.createElement('div');
    expect(div.nodeName).to.eql('DIV');
  });
});

describe('eventful-react', function() {
  var Root = Eventful.createClass({
    componentDidMount: function() {
      // console.log('old root componentDidMount');
    },
    render: function() {
      var children = (
        <div id="root">
          <List listId={1} emit={this.props.emit} />
          <List listId={2} />
        </div>
      );
      // console.log('children',Object.keys(children));
      return children;
    }
  });

  var List = Eventful.createClass({
    clickHandler: function() {
      // console.log('clicked!');
    },
    render: function() {
      var id = 'list-' + this.props.listId;
      return (
        <ul id={id}>
          <Item itemId={id} />
          <Item itemId={id} ref='item1' />
        </ul>
      );
    }
  });

  var Item = Eventful.createClass({
    getInitialState: function() {
      return {
        count: 0
      };
    },
    render: function() {
      var id = 'item-' + this.props.itemId;
      // console.log('id',id);
      return (
        <li className="item" id={id}>{this.state.count}</li>
      );
    }
  });

  describe('getNodeId', function() {
    var getNodeId = require('../../lib/getNodeId');

    it('should return React\'s interal node ID for given React component', function() {
      var id;
      var Test = React.createClass({
        componentDidMount: function() {
          id = getNodeId(this);
          // console.log('id');
        },
        render: function() {
          return <div></div>;
        }
      });
      React.render(<Test />,document.body)

      expect(id).to.be.equal('.0');
    });
  });

  describe('parseIdString', function() {
    var parseIdString = require('../../lib/parseIdString');

    it('should parse a React ID string into an array of IDs', function() {
      expect(parseIdString('.0.1.1.3')).to.be.eql(['0','1','1','3']);
    });
  });

  describe('createClass', function() {
    var virtualDOM = require('../../lib/virtualDOM');

    it('should not prevent old lifecycle methods from running', function(done) {
      var Test = Eventful.createClass({
        componentDidMount: done,
        render: function() {
          return <div></div>
        }
      });

      React.render(<Test />,document.body);
    });

    it('should add a call to virtualDOM.registerComponent to componentDidMount', function(done) {
      var oldRegisterComponent = virtualDOM.registerComponent;
      virtualDOM.registerComponent = function() { done() };

      var Test = Eventful.createClass({
        render: function() {
          return <div></div>
        }
      });

      React.render(<Test />,document.body);
      virtualDOM.registerComponent = oldRegisterComponent;
    });

    it('should add a .emit function to the component', function() {
      var Test = Eventful.createClass({
        componentDidMount: function() {
          this.emit();
        },
        render: function() {
          return <div></div>;
        }
      });

      React.render(<Test />,document.body);
    });

    it('should add a .on function to the component', function() {
      var Test = Eventful.createClass({
        render: function() {
          this.on();
          return <div></div>;
        }
      });

      React.render(<Test />,document.body);
    });
  });
});