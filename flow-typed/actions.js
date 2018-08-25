import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE_RECEIVED, WEBSOCKET_OPEN,
  WEBSOCKET_SEND_MESSAGE,
} from '../src/action';

declare type Action = { };

declare type ConnectAction = { type: WEBSOCKET_CONNECT, url: string };
declare type DisconnectAction = { type: WEBSOCKET_DISCONNECT, url?: ?string };
declare type SendMessageAction = Action &
  { type: WEBSOCKET_SEND_MESSAGE, message: string, url?: ?string };

declare type ConnectingAction = Action &
  { type: WEBSOCKET_CONNECT, timeStamp: Date, websocket: WebSocket };
declare type OpenAction = { type: WEBSOCKET_OPEN, timeStamp: Date, websocket: WebSocket };
declare type ClosedAction = {
  type: WEBSOCKET_CLOSED, timeStamp: Date, websocket: WebSocket,
  event: CloseEvent, reason: string
};
declare type MessageReceivedAction = {
  type: WEBSOCKET_MESSAGE_RECEIVED, timeStamp: Date, websocket: WebSocket,
  message: string
};
declare type ErrorMessageAction = {
  type: WEBSOCKET_MESSAGE_RECEIVED, timeStamp: Date, url: string,
  message: string
};

declare type ActionT = ConnectAction | DisconnectAction | ConnectingAction | ErrorMessageAction |
  MessageReceivedAction | ClosedAction | OpenAction | SendMessageAction | Action;
