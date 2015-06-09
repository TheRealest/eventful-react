# eventful-react

A library for adding Backbone style events to React components.

1. [Summary](#summary)
2. [How it works](#how-it-works)
3. [The problem](#the-problem)
4. [How `eventful-react` solves the problem](#how-eventful-react-solves-the-problem)
5. [How to build for contributions](#how-to-build-for-contributions)
6. [How to include](#how-to-include)
7. [How to contribute](#how-to-contribute)
8. [More info](#more-info)

### Summary

`eventful-react` adds a `.emit` and `.on` method to all your React components. Calling `.emit` will create an event that bubbles up the DOM, from parent to parent, triggering any callbacks registered to listen to that event by `.on` on any component in the ancestor chain.

### How it works

You can start using `eventful-react` in your existing React app by switching out calls to `React.createClass` with `Eventful.createClass`. This will bootstrap your components, registering them with the `eventful` virtual DOM on render, and provide the `.emit` and `.on` methods you can use to create and consume events.

```js
var React = require('react');
var Eventful = require('eventful-react');

var Root = Eventful.createClass({
  ...
});
var Intermediate = Eventful.createClass({
  ...
});
var Child = Eventful.createClass({
  ...
});

React.render(<Root />, document.body);
```

Callbacks are registered with `.on` by passing in an event name and a function. Keep in mind any arguments passed in to `.emit` will be passed into your callback function, and callbacks have their `this` context automatically bound to the component instance where they are registered, like all other React component methods. You can register callbacks any time after a component mounts, usually in the `componentDidMount` method (otherwise `eventful` doesn't know where your component is rendered in the DOM). Don't worry about unregistering callbacks; `eventful` will destroy your callback store on unmount.

```js
var React = require('react');
var Eventful = require('eventful-react');

var Root = Eventful.createClass({
  componentDidMount: function() {
    this.on('event', function(arg) {
      this.setState({ data: arg });
      console.log('Caught event in root with arg:',arg);
    });
  },
  render: function() {
    return <Intermediate />;
  }
});
var Intermediate = Eventful.createClass({
  render: function() {
    return <Child />;
  }
});
var Child = Eventful.createClass({
  render: function() {
    return <div onClick={this.emit.bind(this,'event','arg')}></div>;
  }
});

React.render(<Root />, document.body);
```

Note you still need to include the line `var React = require('react')` in every component file because the JSX in your render functions uses React to build up your components.

### The problem

React is based on a strict, one-way flow of information from parent to children, but sometimes we need event data to flow the opposite direction to allow otherwise unrelated components to respond to each other. In vanilla React we can explicitly pass a handler function to a child component in the render function, but for deeply nested children we would need to pass handlers down through a tree of intermediate components which don't care about the event nor the handler. You can add Flux to the mix to process events, but for some projects setting up a dispatcher, actions, and stores is overkill.

### How `eventful-react` solves the problem

`eventful-react` creates a reverse event flow in your component tree, allowing events to bubble up from child to parent. There is no external system to manage, like with Flux, and events stay inside React, allowing your components to respond with the methods you've already written.

`eventful-react` keeps a virtual DOM which mirrors React's virtual DOM, updating it as components are rendered or removed. Your handler functions stay in the component that is responding to the event, instead of being passed down the tree to where the event is emitted, and components don't have to worry about whether their parent passed them a handler, or if their children are expecting one.

### How to build for contributions

After first cloning the repo make sure to run:

```
npm install
```

You can then build and run the tests with:

```
grunt test
```

Or build the demos with:

```
grunt demo
```

You can also use `grunt test:watch` and `grunt demo:watch` while working on the tests or demos to continually build and/or test any time a file changes.

Finally, you can build the `release/eventful-react.js` file with:

```
grunt release
```

### How to include

Add `eventful` to your project by running `npm install --save eventful-react`. You can then simply `require('eventful-react')` in your component files to start using `eventful`.

### How to contribute

Feel free to submit issues or pull-requests for fixes, new features, or just discussion on improvements to `eventful`.

### More info

I wrote a blog post about `eventful` here: [eventful-react brings Backbone style events to React](http://therealest.github.io/eventful-react-brings-backbone-style-events-to-react/).

