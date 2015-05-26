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
          this.emit('event','arg');
        },
        render: function() {
          return <div></div>;
        }
      });

      React.render(<Test />,document.body);
    });

    it('should add a .on function to the component', function() {
      var Test = Eventful.createClass({
        componentDidMount: function() {
          this.on('event',function callback(){});
        },
        render: function() {
          return <div></div>;
        }
      });

      React.render(<Test />,document.body);
    });
  });

  describe('virtualDOM', function() {
    var virtualDOM = require('../../lib/virtualDOM');

    beforeEach(function() {
      virtualDOM.virtualDOM = {};
    });

    describe('registerComponent', function() {
      it('should add a node to the virtual DOM at the appropriate address', function() {
        virtualDOM.registerComponent({_reactInternalInstance:{_rootNodeID:'.0.1'}});
        expect(virtualDOM.getVirtualNode(['0','1'])).to.not.be.null;
        // expect(virtualDOM.getVirtualNode(virtualDOM.getParentAddress(['0','1']))).to.not.be.null;
      });

      it('should create a CallbackStore for the given address', function() {
        virtualDOM.registerComponent({_reactInternalInstance:{_rootNodeID:'.0.1'}});
        expect(virtualDOM.getVirtualNode(['0','1']).callbackStore).to.not.be.null;
      });
    });

    describe('unregisterComponent', function() {
      it('should remove a node and all its children from the virtual DOM at the appropriate address', function() {
        virtualDOM.registerComponent({_reactInternalInstance:{_rootNodeID:'.0.1'}});
        expect(virtualDOM.getVirtualNode(['0','1'])).to.not.be.null;
        virtualDOM.unregisterComponent({_reactInternalInstance:{_rootNodeID:'.0'}});
        expect(virtualDOM.getVirtualNode(['0','1'])).to.be.undefined;
        expect(virtualDOM.getVirtualNode(['0'])).to.be.undefined;
      });
    });

    describe('parseIdString', function() {
      it('should parse a React ID string into an array of IDs', function() {
        expect(virtualDOM.parseIdString('.0.1.1.3')).to.be.eql(['0','1','1','3']);
      });
    });

    describe('resolveEvent', function() {

    });

    describe('registerCallback', function() {

    });
  });

  describe('callbackStore', function() {
    describe('registerCallback', function() {

    });

    describe('respondToEvent', function() {

    });
  });

  describe('.emit', function() {
    it('should call registered callbacks on any ancestor component', function(done) {
      var Root = Eventful.createClass({
        componentDidMount: function() {
          this.on('event', function() { done() });
        },
        render: function() {
          return <div><List /></div>;
        }
      });

      var List = Eventful.createClass({
        render: function() {
          return <div><Item /></div>; 
        }
      });

      var Item = Eventful.createClass({
        handleClick: function() {
          this.emit('event');
        },
        render: function() {
          return <div id="item" onClick={this.handleClick}>item text</div>;
        }
      });

      React.render(<Root />,document.body);
      testUtils.Simulate.click(document.querySelector('#item'));
    });

    it('should pass args to event handlers', function(done) {
      var Root = Eventful.createClass({
        componentDidMount: function() {
          this.on('event', function(arg) { if (arg === 2) done() });
        },
        render: function() {
          return <div><List /></div>;
        }
      });

      var List = Eventful.createClass({
        render: function() {
          return <div><Item /></div>; 
        }
      });

      var Item = Eventful.createClass({
        handleClick: function() {
          this.emit('event',2);
        },
        render: function() {
          return <div id="item" onClick={this.handleClick}>item text</div>;
        }
      });

      React.render(<Root />,document.body);
      testUtils.Simulate.click(document.querySelector('#item'));
    });

    it('should work with this.props.children', function(done) {
      var Root = Eventful.createClass({
        componentDidMount: function() {
          this.on('event', function(arg) { if (arg === 2) done() });
        },
        render: function() {
          return (
            <List>
              <Item />
              <Item />
              <Item />
            </List>
          );
        }
      });

      var List = Eventful.createClass({
        render: function() {
          return <div>{this.props.children}</div>; 
        }
      });

      var Item = Eventful.createClass({
        handleClick: function() {
          this.emit('event',2);
        },
        render: function() {
          return <div id="item" onClick={this.handleClick}>item text</div>;
        }
      });

      React.render(<Root />,document.body);
      testUtils.Simulate.click(document.querySelector('#item'));
    });

  });

  describe('.on', function() {
    it('should register a callback that can be triggered by any descendant component', function(done) {
      var Root = Eventful.createClass({
        componentDidMount: function() {
          this.on('event', function() { done() });
        },
        render: function() {
          return <div><List /></div>;
        }
      });

      var List = Eventful.createClass({
        render: function() {
          return <div><Item /></div>;
        }
      });

      var Item = Eventful.createClass({
        handleClick: function() {
          this.emit('event');
        },
        render: function() {
          return <div id="item" onClick={this.handleClick}>item text</div>;
        }
      });

      React.render(<Root />,document.body);
      testUtils.Simulate.click(document.querySelector('#item'));
    });
  });
});