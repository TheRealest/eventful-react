# eventful-react

A library for adding Backbone style events to React components.

### Summary

With one function call, `eventful-react` adds a `.emit` and `.on` method to every descendant of your root component. Calling `.emit` will create an event that bubbles up the ancestor chain, from parent to parent, triggering any callbacks attached to that event by `.on` on any component in the chain.

### The Problem

React is based on a strict, one-way flow of information from parent to children, but sometimes we need event data to flow the opposite direction to allow otherwise unrelated components to respond to each other. In vanilla React we can explicitly pass a handler function to a child component, but for deeply nested children we would need to pass handlers down through a tree of intermediate components which don't care about the event nor the handler. You can add Flux to the mix to process events, but for some projects setting up a dispatcher, actions, and stores is overkill.

### How `eventful-react` solves the problem

`eventful-react` creates a reverse event flow in your component tree, allowing events to bubble up from child to parent. There is no external system to manage, like with Flux, and events stay inside React, allowing your components to respond with the methods you've already written.

`eventful-react` traverses your component tree before you render it, adding the appropriate helper functions to each component. Your handler functions stay in the component responding to the event, instead of being passed down the tree to where the event originates, and components don't have to worry about whether their parent passed down a handler, or how that handler is implemented.