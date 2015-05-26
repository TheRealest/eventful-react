var mocha = require('mocha');
var expect = require('chai').expect;
var jsdom = require('jsdom').jsdom;
global.document = jsdom();
global.window = document.parentWindow;
global.navigator = window.navigator;

var React = require('react');
require('react/addons');
var testUtils = React.addons.TestUtils;
var eventful = require('../../eventful-react');


describe('jsdom', function() {
  it('creates a document', function() {
    var div = document.createElement('div');
    expect(div.nodeName).to.eql('DIV');
  });
});

describe('eventful-react', function() {
  var print = function(t) { return t._reactInternalInstance._rootNodeID; };

  var Root = eventful.createClass({
    componentDidMount: function() {
      console.log('old root componentDidMount');
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

  var List = React.createClass({
    clickHandler: function() {
      // console.log('clicked!');
    },
    componentDidMount: function() {
      console.log('list',print(this));
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

  var Item = React.createClass({
    getInitialState: function() {
      return {
        count: 0
      };
    },
    render: function() {
      var id = 'item-' + this.props.itemId;
      console.log('id',id);
      return (
        <li className="item" id={id}>{this.state.count}</li>
      );
    }
  });

  beforeEach(function() {
    React.render(<Root />, window.document.body);
  });

  describe('bootstrapping process', function() {
    it('should add a .emit method to every component', function() {
      // console.log('bootstrap:',eventful.bootstrap(Root));
      // console.log('list contents:',document.querySelector('#list-1').innerHTML);
      // eventful.bootstrap(Root);
    });

    it('should add a .on method to every component', function() {
      testUtils.Simulate.click(document.querySelector('#item-list-1'));
      // expect().to.be.equal(1);
    });
  });
});