# FP Redux WebSocket Middleware

[![npm version](https://badge.fury.io/js/fp-redux-websocket.svg)](https://badge.fury.io/js/fp-redux-websocket)
[![Build Status](https://travis-ci.org/pasalino/fp-redux-websocket.svg?branch=master)](https://travis-ci.org/pasalino/fp-redux-websocket)
[![Maintainability](https://api.codeclimate.com/v1/badges/9accb32724f49f04b142/maintainability)](https://codeclimate.com/github/pasalino/fp-redux-websocket/maintainability)
[![codecov](https://codecov.io/gh/pasalino/fp-redux-websocket/branch/master/graph/badge.svg)](https://codecov.io/gh/pasalino/fp-redux-websocket)
[![Requirements Status](https://requires.io/github/pasalino/fp-redux-websocket/requirements.svg?branch=master)](https://requires.io/github/pasalino/fp-redux-websocket/requirements/?branch=master)
[![airbnb-style](https://img.shields.io/badge/eslint-airbnb-4B32C3.svg)](https://github.com/airbnb/javascript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Yet Another Redux Middleware for websocket.
Websocket Middleware enable simple to use websocket with Redux. 
This middleware use action to dispatch actions with Redux and interact with WebSocket.
Dispatch action in Redux directly from server.

### Why use this?

If you had to do with Websockets and Redux, you will have surely tried some and you have noticed that some features is missing.
This library ecloses all features that you may need in WebSocket used with Redux.

It's dependences free and have <10k size.

The middleware provide an auto reconnect system when websocket is closed my error. 
By default encode and decode JSON message.
If you want dispatch directly actions from server in Redux. If you send JSON in Action pattern the middleware dispatch it.

Support multi WebSockets for use Redux with different channels.

Other important features missing in other library is heartbeat for avoid websocket timeout disconnect. We do it :D.

Other things? It have a beautiful name!

## Features

* Creating and opening the WebSocket for multiple endpoints
* Autoreconnect on websocket connection closed
* Heartbeat message
* Customizable heartbeat message and interval.
* Encoding/Decoding JSON Messages
* Dispatch Redux Action from Server


## Installation

```js
npm install --save fp-redux-websocket
```

## Configuration

Install as similar redux middleware:

```js
import { applyMiddleware, createStore } from 'redux';
import { createFPWebSocketMiddleware } from 'fp-redux-websocket';

const wsProps =  {
  // See Options paragraph
}

const webSocketMiddleware = createFPWebSocketMiddleware(wsProps);

const store = createStore(reducer, applyMiddleware(webSocketMiddleware))

```

## Options

| Param                   	| Description                                                                                                                        	| Type    	| Default         	|
|-------------------------	|------------------------------------------------------------------------------------------------------------------------------------	|---------	|-----------------	|
| heartbeat               	| Enable heartbeat message.                                                                                                          	| boolean 	| false           	|
| heartbeatMessage        	| Heartbeat message sendend each interval if heartbeat is true.                                                                      	| string  	| ---heartbeat--- 	|
| heartbeatInterval       	| Interval beetween two message for send heartbeat. If websocket send or receive a message, the interval is reset.  In milliseconds. 	| number  	| 15000           	|
| autoReconnect           	| Enable autoreconnect if websocket is closed for any reason different from user closed.                                             	| boolean 	| false           	|
| intervalReconnect       	| Interval beetween last closed (user closing excluded) and next reconnect, if autoReconnect is enabled. In milliseconds.            	| number  	| 5000            	|
| useMessageAsReduxAction 	| If websocket receive a message in action pattern, dispatch it on redux.                                                           	| boolean 	| false           	|


## Actions 

The following actions are available in middleware. All actions would be caught by reducers or other middleware.

```js
// These message are user-generated
WEBSOCKET_CONNECT
WEBSOCKET_DISCONNECT
WEBSOCKET_SEND_MESSAGE

// These messages are generated by WebSocket
WEBSOCKET_CONNECTING
WEBSOCKET_OPEN
WEBSOCKET_CLOSED
WEBSOCKET_MESSAGE_RECEIVED
WEBSOCKET_ERROR
```

There is two action creator for send message:
* `sendMessage` for sending string message
* `sendObject` for sending object message (this parse object to string with JSON)

You can import ACTION and ActionCreator from standar library

```
import { sendObject, WEBSOCKET_OPEN, wsConnect } from 'fp-redux-websocket';
```

## User Action API
That actions can be dispatched from user

### WEBSOCKET_CONNECT
Open a connection to a WebSocket

`wsConnect(url)`

### WEBSOCKET_DISCONNECT
Close a connection to a WebSocket

`wsDisconnect(url?)`

If `url` is `null`, middleware close the first (or unique) WebSocket opened

### WEBSOCKET_SEND_MESSAGE
Send message to websocket

`sendMessage(string,url?)`

Send a string to websocket. If `url`is null, send message to unique WebSocket opened.

`sendObejct(obejct,url?)`

Send an object to websocket. If `url`is null, send object to unique WebSocket opened.

## WebSocket actions 
Websocket actions correspond to the callbacks on a WebSocket object. 

### WEBSOCKET_CONNECTING
After `WEBSOCKET_CONNECT`in connecting phase.

```js
{
  type: WEBSOCKET_CONNECTING,
  timeStamp: Date,
  websocket: WebSocket,
}
```

### WEBSOCKET_OPEN
Dispatched from redux-websocket when the WebSocket `onopen` callback is executed.

```js
{
  type: WEBSOCKET_OPEN,
  timeStamp: Date,
  websocket: WebSocket,
}
```

### WEBSOCKET_CLOSED
Dispatched from redux-websocket when the WebSocket `onclosed` callback is executed. 

```js
{
  type: WEBSOCKET_CLOSED,
  reason: String,
  timeStamp: Date,
  websocket: WebSocket,
}
```

### WEBSOCKET_MESSAGE_RECEIVED
When WebSocket received message

```js
{
  type: WEBSOCKET_MESSAGE_RECEIVED,
  message: String,
  timeStamp: Date,
  websocket: WebSocket,
}
```

### WEBSOCKET_ERROR
When WebSocket throw error

```js
{
  type: WEBSOCKET_ERROR,
  message: String,
  timeStamp: Date,
  url: String,
}
```

## Changelog

All main changelog is reporting in [CHANGELOG.md](CHANGELOG.md)


## Maintainers

[Pasqualino de Simone @pasalino](http://www.github.com/pasalino)

Thanks to [Federico Blancato](https://github.com/ksnll) who contributed to the initial version of this library

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

If you like this library and would like to make modifications or addition, please fork repo and issue a pull request. Here a couple things that we know are needed.

- [ ] Better test coverage
- [ ] Create example for use in React
- [ ] Create example for use with Server (Node.js, Ruby, Django)
- [ ] Create example for use multisocket

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [Tags](https://github.com/pasalino/fp-redux-websocket/tags).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
