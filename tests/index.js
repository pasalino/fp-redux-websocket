/* eslint-env mocha */
import userActions from './userActions';
import socketActions from './socketActions';

const { describe } = require('mocha');

// const { createPersistentWebSocketMiddleware } = require('../src');

// const customDispatcher = (func: Function, options: ?Options) => {
//   const middleware = createPersistentWebSocketMiddleware(options)({
//     dispatch(action) {
//       func(action);
//       middleware(action);
//     },
//   })(() => {
//   });
//   return middleware;
// };

describe('Test suite', () => {
  describe('Actions', () => {
    userActions();
    socketActions();
  });
});
//
// describe('WebSocketMiddleware', () => {
//   const sendMessage = 'Test data';
//   const sendObjectMessage = { message: sendMessage };
//   const wsUrl = 'ws://localhost:8080/';
//
//   const connectAction: Action = { type: WEBSOCKET_CONNECT, payload: { url: wsUrl } };
//   const disconnectAction: Action = { type: WEBSOCKET_DISCONNECT, payload: { url: wsUrl } };
//   const sendMessageAction: Action = {
//     type: WEBSOCKET_SEND,
//     payload: { data: sendMessage, url: wsUrl },
//   };
//
//   const sendMessageObjectAction: Action = {
//     type: WEBSOCKET_SEND,
//     payload: { data: sendObjectMessage, url: wsUrl },
//   };
//
//   let mockServer = new Server(wsUrl);
//   let mockClient: ?WebSocket = null;
//
//   const customDispatcherTest = customDispatcher(() => {
//   });
//   it('Opens a socket and connect to it', (done) => {
//     mockServer.on('connection', (socket) => {
//       mockClient = socket;
//       done();
//     });
//     customDispatcherTest(connectAction);
//   });
//
//   it('Send data through websocket', (done) => {
//     mockClient.on('message', (data) => {
//       expect(data).to.be.a('string');
//       expect(data).to.equal(sendMessage);
//       done();
//     });
//     customDispatcherTest(sendMessageAction);
//   });
//
//   it('Send object through websocket', (done) => {
//     mockClient.stop();
//     mockClient = new Server(wsUrl);
//     mockClient.on('message', (data) => {
//       expect(data).to.be.a('string');
//       const objectData = JSON.parse(data);
//       expect(objectData).to.deep.equal(sendObjectMessage);
//       done();
//     });
//     customDispatcherTest(connectAction);
//     customDispatcherTest(sendMessageObjectAction);
//   });
//
//   it('Check if disconnect is emitted', (done) => {
//     mockServer.stop();
//     mockServer = new Server(wsUrl);
//
//     const customDispatcherDisconnect = customDispatcher((action) => {
//       if (action.type === WEBSOCKET_CLOSED) {
//         done();
//       }
//     });
//
//     mockServer.on('connection', (socket) => {
//       socket.close();
//     });
//     customDispatcherDisconnect(connectAction);
//   });
//
//   it('Testing webSocket errors', (done) => {
//     mockServer.stop();
//     mockServer = new Server(wsUrl);
//
//     const sendMessageActionError: Action = {
//       type: WEBSOCKET_SEND,
//       payload: { data: sendMessage, url: 'ws://error' },
//     };
//     const customDispatcherError = customDispatcher((action) => {
//       switch (action.type) {
//         case WEBSOCKET_OPEN:
//           customDispatcherError(sendMessageActionError);
//           break;
//         case WEBSOCKET_ERROR:
//           expect(action.payload.event.message).to.be.a('string');
//           expect(action.payload.event.message).to.equal('Cannot find websocket');
//           done();
//           break;
//         default:
//           break;
//       }
//     });
//     customDispatcherError(connectAction);
//   });
//
//   it('Check if connection is emitted after disconnect (reconnecting)', (done) => {
//     mockServer.stop();
//     mockServer = new Server(wsUrl);
//     let closed: Boolean = false;
//     const customDispatcherDisconnect = customDispatcher((action) => {
//       if (action.type === WEBSOCKET_CONNECT) {
//         if (closed) done();
//       }
//       if (action.type === WEBSOCKET_CLOSED) {
//         closed = true;
//       }
//     });
//
//     mockServer.on('connection', (socket) => {
//       socket.close();
//     });
//     customDispatcherDisconnect(connectAction);
//   });
//
//   it('Test disconnect action', (done) => {
//     mockServer.stop();
//     mockServer = new Server(wsUrl);
//     const customDispatcherDisconnect = customDispatcher((action) => {
//       if (action.type === WEBSOCKET_CLOSED) {
//         mockServer.stop();
//         done();
//       }
//     }, { heartbeat: true });
//     customDispatcherDisconnect(connectAction);
//     mockServer.on('connection', () => {
//       customDispatcherDisconnect(disconnectAction);
//     });
//   });
//
//
//   it('Test Heartbeat', (done) => {
//     const heartbeatMessage = '---heartbeat---';
//     const heartbeatInterval = 1000;
//     mockServer.stop();
//     mockServer = new Server(wsUrl);
//     const customDispatcherHeartBeat = customDispatcher(
//       () => {},
//       { heartbeat: true, heartbeatMessage, heartbeatInterval },
//     );
//     mockServer.on('message', (data) => {
//       expect(data).to.be.a('string');
//       expect(data).to.equal(heartbeatMessage);
//       customDispatcherHeartBeat(disconnectAction);
//       done();
//     });
//     customDispatcherHeartBeat(connectAction);
//   }).timeout(5000);
// });
