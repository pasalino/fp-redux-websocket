/* eslint-disable flowtype/no-weak-types */
// @flow
import {
  closed,
  connecting,
  error,
  messageReceived,
  open,
  sendMessage,
  sendObject,
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_CONNECTING,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_ERROR,
  WEBSOCKET_MESSAGE_RECEIVED,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND_MESSAGE,
  wsConnect,
  wsDisconnect,
} from './action';
import {
  addSocket,
  addSocketToCloseByUser,
  checkCloseByUser,
  defaultProps,
  getSocket,
  getSocketIndex,
  removeSocket,
  removeSocketToCloseByUser,
  startHeartbeat,
  stopHeartbeat,
  WS_READY_STATE_OPEN,
} from './utils';


export const createFPWebSocketMiddleware = (options: Options = {}): Function => {
  const websocketOptions: Options = Object.assign({}, defaultProps, options);
  let webSocketList: Array<WebSocket> = [];
  let webSocketTimeoutList: TimeoutList = {};
  const closedByUser: Array<string> = [];

  return ({ dispatch }: { dispatch: Function }): Function =>
    // eslint-disable-next-line flowtype/require-parameter-type
    (next: Function): Function => (action) => {
      switch (action.type) {
        case WEBSOCKET_CONNECT: {
          const actionCast = (action: ConnectAction);

          const activeSocket = getSocket(webSocketList, actionCast.url);
          if (!activeSocket) {
            const ws: WebSocket = new WebSocket(actionCast.url);
            addSocket(webSocketList, ws);

            ws.onmessage = (event: MessageEvent) => {
              dispatch(messageReceived(event, ws));
            };
            ws.onopen = () => {
              dispatch(open(ws));
            };
            ws.onclose = (event: CloseEvent) => {
              dispatch(closed(event, ws));
            };
            ws.onerror = () => {
              dispatch(error('Error in websocket', ws.url));
            };
            next(action);
            next(connecting(ws));
            return;
          }

          break;
        }
        case WEBSOCKET_DISCONNECT: {
          const actionCast = (action: DisconnectAction);

          const socket = getSocket(webSocketList, actionCast.url);
          if (socket) {
            addSocketToCloseByUser(closedByUser, socket.url);
            socket.close();
          } else {
            dispatch(error(new Error('Cannot find webSocket'), actionCast.url || ''));
          }
          break;
        }
        case WEBSOCKET_SEND_MESSAGE: {
          const actionCast = (action: SendMessageAction);

          const activeSocketIndex = getSocketIndex(webSocketList, actionCast.url || '');
          if (activeSocketIndex === -1) {
            dispatch(error(new Error('Cannot find webSocket'), actionCast.url || ''));
            break;
          }

          const activeSocket = webSocketList[activeSocketIndex];

          if (activeSocket.readyState !== WS_READY_STATE_OPEN) {
            dispatch(error(new Error('WebSocket is not open'), activeSocket.url));
            break;
          }

          activeSocket.send(actionCast.message);

          if (websocketOptions.heartbeat) {
            webSocketTimeoutList = startHeartbeat(
              webSocketTimeoutList,
              activeSocket, websocketOptions.heartbeatMessage,
              websocketOptions.heartbeatInterval,
            );
          }
          break;
        }
        case WEBSOCKET_CONNECTING: {
          break;
        }
        case WEBSOCKET_OPEN: {
          const actionCast = (action: OpenAction);

          const activeSocket = getSocket(webSocketList, actionCast.websocket.url);

          if (!activeSocket) {
            dispatch(error(new Error('Error in open WebSocket'), actionCast.websocket.url));
            break;
          }

          if (websocketOptions.heartbeat) {
            webSocketTimeoutList = startHeartbeat(
              webSocketTimeoutList,
              activeSocket, websocketOptions.heartbeatMessage,
              websocketOptions.heartbeatInterval,
            );
          }

          break;
        }
        case WEBSOCKET_CLOSED: {
          const actionCast = (action: ClosedAction);
          if (!actionCast.websocket) {
            dispatch(error(new Error('Cannot find webSocket'), actionCast.websocket.url));
            break;
          }

          if (websocketOptions.heartbeat) {
            webSocketTimeoutList = stopHeartbeat(webSocketTimeoutList, actionCast.websocket);
          }

          webSocketList = removeSocket(webSocketList, actionCast.websocket.url);

          if (!checkCloseByUser(closedByUser, actionCast.websocket.url) && options.autoReconnect) {
            next(action);
            setTimeout(
              () => {
                dispatch(wsConnect(actionCast.websocket.url));
              },
              options.intervalReconnect,
            );
            return;
          }
          removeSocketToCloseByUser(closedByUser, actionCast.websocket.url);
          break;
        }
        case WEBSOCKET_MESSAGE_RECEIVED: {
          const actionCast = (action: MessageReceivedAction);

          if (websocketOptions.heartbeat) {
            const ws = getSocket(webSocketList, actionCast.websocket.url);

            if (ws) {
              webSocketTimeoutList = startHeartbeat(
                webSocketTimeoutList,
                ws, websocketOptions.heartbeatMessage,
                websocketOptions.heartbeatInterval,
              );
            }
          }
          if (options.useMessageAsReduxAction) {
            let obj = '';
            try {
              obj = JSON.parse(actionCast.message);
            } catch (e) {
              dispatch(error(new Error('Error while parsing Redux Action'), actionCast.websocket.url));
            }
            next(action);
            dispatch(obj);
            return;
          }
          break;
        }
        case WEBSOCKET_ERROR: {
          break;
        }
        default: {
          break;
        }
      }
      next(action);
    };
};

export {
  wsConnect,
  wsDisconnect,
  sendMessage,
  sendObject,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_SEND_MESSAGE,
  WEBSOCKET_CONNECTING,
  WEBSOCKET_OPEN,
  WEBSOCKET_CLOSED,
  WEBSOCKET_MESSAGE_RECEIVED,
  WEBSOCKET_ERROR,
};

