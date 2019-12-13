Redux is a functional state management system. In Redux, `Action Creators` `dispatch` `actions` which are objects with a `type` and `payload`. Action creators can be async, in which case `thunk` is used to wrap the action creator and only `dispatch` after the async code resolves. Dispatched `actions` are received by **all** `reducers`, which are functions that take in a slice of `state` and an `action`, and return updated `state`. Each reducer exports a single slice of the state -- the value of a single key in the state object. The combined initial returned values (returned state) of `reducers` determines the initial state of the store.

## Process
1. Define all actions as strings. Put them in a single file and export each action by name. For large applications, use `/` to denote apps:
```
    export const ADD_TASK = 'task/add';
    export const CREATE_USER = 'user/create;
```
2. Define an interface for each object type in our store in a `types.js` for each store slice (using ducks code organization method). Export 

3. Define interfaces for action objects, then export a type that is the union of those action object interfaces (when we annotate this as the return type on action creators, Typescript will infer which interface is actually being returned based on `type` attr of action object returned)

## Concepts
- `state`:  The value of the store, and what is returned by `getState()`. State should be serializable object (and is often deeply nested).
- `action`: A plain object that represents the intention to change state. An action is thus the input to reducers, which actually change state. An action has a `type` and a `payload`. (only type is required; payload is Flux convention).
- `async action`: Is value that is created by an action creator, but is not an `action` ready for `dispatch` method. The `async action` will be passed to middleware, which will transform it into an `action`.
- `action creator`: A function that returns an `action` object. **Action creators do not dispatch actions**.
- `reducer`: A function that alters state. Reducers accept state and `action` as params, and return a slice of state. Reducers are synchronous pure functions.
    - Technically, all reducers are actually combined, and every redux store has a single root reducer.
- `dispatching function`: A function that accepts action (including async action) and determines whether or not to use redux `dispatch` method to dispatch that action to the store. All `middleware` wraps the base dispatch function, acting as a dispatching function that can delay, ignore, or transform actions before they are passed to next middleware.
- `middleware`: Higher order function that composes `dispatch` and returns a new dispatch function. Middleware typically turns `async action` objects into `action` objects.

### [Redux-Thunk](https://github.com/reduxjs/redux-thunk/blob/master/src/index.js)
Vanilla action creators are functions that return an action:
```
(x) => { ...<create action obj>... return actionObject }
```
With `redux-thunk`, we have **action creators return functions** instead of action objects. These functions are invoked by `redux-thunk` middleware with `dispatch` and `getState` params:
```
(x) => async (dispatch, getState) => { ...<create action obj>... dispatch(actionObject) }
```
So we go from needing to `dispatch` the return of our action creator, to having `redux-thunk` invoke the _function_ returned by our action creator with `dispatch` as a param, so the function returned by our action creator can dispatch its own action object and we **don't** need to call dispatch outside of the action creator.

## Structure

## Rules