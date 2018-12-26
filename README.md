# Redux-Communication

Request communication-state tracker that's pluggable into `redux`.

[![npm version](https://badge.fury.io/js/redux-communication.svg)](https://badge.fury.io/js/redux-communication)
[![Maintainability](https://api.codeclimate.com/v1/badges/f89bdda12dd3c6fb77b9/maintainability)](https://codeclimate.com/github/MatthiasMargot/redux-communication/maintainability)
![](https://codecov.io/gh/MatthiasMargot/redux-communication/branch/master/graph/badge.svg)
![](https://travis-ci.org/MatthiasMargot/redux-communication.svg?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/MatthiasMargot/redux-communication/badge.svg?targetFile=package.json)](https://snyk.io/test/github/MatthiasMargot/redux-communication?targetFile=package.json)

---

Definition of *communication-state* in the scope of this library:

>*Communication state is the transitional state that a request communicating with an external source has to go through from initiation to completion.
The transitionary sub-states of communication-state commonly include: in-flight (fetching/loading) failed-state (represented by an error) and success-state (represented by a successful response)*

Redux-Communication removes the need for you to worry about boilerplate-heavy communication-state handling that is necessary to represent any request transitions in you redux-application by generalizing the following:
- Dispatching `requested`, `error` and `success` actions
- Storing `fetching`, `error` and `response` states in your redux-store
- Creating the selector necessary to get the communication-state of any given request from your state
- Creating the action-creator needed to trigger your request
- Creating the action-types for the events occurring during a given request's life-cycle

By having all of these automatically generated and handled by the reducer-middleware-duo, your code is left with much less redux request-handling-boilerplate & you'll have much less pesky asynchronous code to test.

## Table of contents
* [Installation](#installation)
* [Usage](#usage)
  * [Creating a request](#creating-a-request)
  * [Listening for request-actions yourself](#listening-for-request-actions-yourself)
* [API](#api)
  * [createCommunication](#createcommunication)
  * [createRequest](#createrequest)
  * [RequestActionTypes](#requestactiontypes)
  * [Communication](#communication)
  
  
* [Does this cover my use-case?](#does-this-cover-my-use-case?)

---

## Installation
Install from the `npm` registry
```sh
npm i redux-communication
```

Use [createCommunication](#createcommunication) to create a [ middleware, request ] tuple and plug it into redux.

```js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createCommunication }                           from 'redux-communication'

const [ communicationMiddleware, communicationReducer ] = createCommunication()

/*
 * redux-communication makes the assumption that your communication-state
 * is situated under the key 'communication' so make sure you map the
 * returned communicationReducer to that key
 */
const reducer = combineReducers({ communication: communicationReducer })

const store = createStore(
  reducer,
  applyMiddleware(communicationMiddleware)
)
```

---

## Usage

### Creating a request
Use [createRequest](#createrequest) to create an [ actionCreator, communicationSelector ] tuple
```js
import { createRequest } from 'redux-communication'

const dataRequest = createRequest(
  'data',
  id => fetch(`https://my-api.com/v1/data/${id}`),
)

/*
 * export and use in a different file (for example from a React-Component
 * connected with 'react-redux's 'connect()') to trigger the request in
 * the middleware
 */
export const [ requestData ] = dataRequest
```
In this example `requestData` is an action-creator that will trigger the actual call for the data to be executed.

The actual request-function requires an `id` argument in this example, to make sure that the fetch-caller function receives that argument call & dispatch the `requestData` action-creator with that argument as follows:
```js
store.dispatch(requestData(42))
```

---

### Listening for request-actions yourself

The third element in the tuple returned from [createRequest](#createrequest) is a [RequestActionTypes](#requestactiontypes) object for the created request.
You can use it to hook your own reducers up to the events of that request's communication-state.
```js
import { createRequest } from 'redux-communication'

const dataRequest = createRequest(
  'data',
  () => fetch(endpoint),
)

const [ , , dataRequestActionTypes ] = dataRequest

const { succeeded } = dataRequestActionTypes

const dataReducer = (state, action) => {
  switch (action.type) {
    case [ succeeded ]: {
      const { response } = action.payload
      /*
       * react to the data-request having succeeded you
       * have access to action.payload.response here
       *
       * response being the value your promise resolved with
       */
    }
  }
}

```

---

## API

### createCommunication:
```
() => [
  requestMiddleware,
  requestReducer,
]
```
Hopefully this is self explantory, see [Installation](#installation) for guide of usage of this.

---

### createRequest:
```
(namespace, request) => [
  requestActionCreator,
  requestCommunicationSelector,
  requestActionTypes,
]
```
`namespace: string`
Used to create name-spaced action-types of this format `@@communication [ namespace ] REQUESTED`

`request: (...args) => Promise`
Returns a promise
will receive whatever you pass into the action-creator returned from `createRequest`

`requestActionCreator: (...args) => Action`
Action-Creator
returns a redux-action
the arguments you pass into this are passed to the `request` function (2nd argument of `createRequest`)
[Redux Docs: Action Creators](https://redux.js.org/recipes/reducing-boilerplate#action-creators)

`requestCommunicationSelector: (state) => Communication`
Selector function, returns a [Communication](#communication) object
[Redux Docs: Selectors](https://redux.js.org/introduction/learning-resources#selectors)

`requestActionTypes: RequestActionTypes`
[RequestActionTypes](#requestactiontypes)

---

### RequestActionTypes:
```
{
  requested: string
  failed: string
  succeeded: string
}
```
The action-types a given request uses to track its communication-state.

---

### Communication:
```
{
  fetching: boolean
  error: any
  response: any
}
```
`fetching: boolean`
The fetching state of a given request-communication

`error: any`
The error your promise might throw (the promise that is returned from the `request` argument in `createRequest`)

`response: any`
The value your promise might resolve to (the promise that is returned from the `request` argument in `createRequest`)

---

## Does this cover my use case?
This library is agnostic as can be about any other aspect of your application in order to cover as many edge-cases as possible.

It does for example not make assumptions about the technology you are using to make your requests ( can be `axios`, can be `fetch`, can even be `jQ` ).

Because your use-case might not be covered by simply storing the error/response in some place in the state this library exposes the generated action-types created for each request so you can hook into them.

Nothing is hidden away, everything passing through the communication-middleware is exposed and you can listen for it too!

---

## Author
Matthias Margot <matthiasmargot@hotmail.com>

---

## License
MIT