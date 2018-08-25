export const WS_READY_STATE_CONNECTING = 0;
export const WS_READY_STATE_OPEN = 1;
export const WS_READY_STATE_CLOSING = 2;
export const WS_READY_STATE_CLOSED = 3;


export const defaultProps: Options = {
  heartbeat: false,
  heartbeatMessage: '---heartbeat---',
  heartbeatInterval: 15000,
  intervalReconnect: 5000,
  autoReconnect: false,
  useMessageAsReduxAction: false,
};

export const getSocketIndex = (webSocketList: Array<WebSocket>, url: string): number => {
  if (!url && webSocketList.length === 1) return 0;
  return webSocketList.findIndex((el: WebSocket): boolean => el.url === url);
};

export const getSocket = (webSocketList: Array<WebSocket>, url: ?string): ?WebSocket => {
  if (!url && webSocketList.length === 1) return webSocketList[0];
  return webSocketList.find((el: WebSocket): boolean => el.url === url);
};


export const addSocket = (webSocketList: Array<WebSocket>, ws: WebSocket): Array<WebSocket> => {
  const newWebSocketList = Object.assign(webSocketList);

  newWebSocketList.push(ws);

  return newWebSocketList;
};

export const removeSocket = (webSocketList: Array<WebSocket>, url: string): Array<WebSocket> => {
  const activeSocketIndex = getSocketIndex(webSocketList, url);

  const sliceArray = webSocketList.slice();
  if (activeSocketIndex >= 0) {
    sliceArray.splice(activeSocketIndex, 1);
  }

  return sliceArray;
};


export const addSocketToCloseByUser =
  (closeByUserList: Array<string>, url: string): Array<string> => {
    const newCloseByUserList = Object.assign(closeByUserList);
    newCloseByUserList.push(url);
    return newCloseByUserList;
  };


export const removeSocketToCloseByUser =
  (closeByUserList: Array<string>, url: string): number => {
    const activeSocketIndex = closeByUserList.findIndex((el: string): boolean => el === url);

    const sliceArray = closeByUserList.slice();
    if (activeSocketIndex >= 0) {
      sliceArray.splice(activeSocketIndex, 1);
    }

    return activeSocketIndex;
  };

export const checkCloseByUser = (closeByUserList: Array<string>, url: string): boolean =>
  closeByUserList.findIndex((el: string): boolean => el === url) !== -1;

export const stopHeartbeat =
  (webSocketTimeoutList: TimeoutList, webSocket: WebSocket): TimeoutList => {
    const newWebSocketTimeoutList = Object.assign(webSocketTimeoutList);

    clearTimeout(newWebSocketTimeoutList[webSocket.url]);
    delete newWebSocketTimeoutList[webSocket.url];

    return newWebSocketTimeoutList;
  };


export const startHeartbeat = (
  webSocketTimeoutList: TimeoutList, webSocket: WebSocket,
  heartbeatMessage: ?string = defaultProps.heartbeatMessage,
  heartbeatInterval: ?number,
): TimeoutList => {
  const newWebSocketTimeoutList = stopHeartbeat(webSocketTimeoutList, webSocket);

  newWebSocketTimeoutList[webSocket.url] = setTimeout(() => {
    webSocket.send(heartbeatMessage);
    startHeartbeat(webSocketTimeoutList, webSocket, heartbeatMessage, heartbeatInterval);
  }, heartbeatInterval || defaultProps.heartbeatInterval);

  return webSocketTimeoutList;
};

export const getCloseReasonDescription = (event: CloseEvent): string => {
  // See http://tools.ietf.org/html/rfc6455#section-7.4.1
  switch (event.code) {
    case 1000:
      return 'Normal closure, meaning that the purpose for which the connection was established has been fulfilled.';
    case 1001:
      return 'An endpoint is "going away", such as a server going down or a browser having navigated away from a page.';
    case 1002:
      return 'An endpoint is terminating the connection due to a protocol error';
    case 1003:
      return 'An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).';
    case 1004:
      return 'Reserved. The specific meaning might be defined in the future.';
    case 1005:
      return 'No status code was actually present.';
    case 1006:
      return 'The connection was closed abnormally, e.g., without sending or receiving a Close control frame';
    case 1007:
      return 'An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).';
    case 1008:
      return 'An endpoint is terminating the connection because it has received a message that "violates its policy". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.';
    case 1009:
      return 'An endpoint is terminating the connection because it has received a message that is too big for it to process.';
    case 1010:
      return `An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: ${event.reason}`;
    case 1011:
      return 'A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.';
    case 1015:
      return 'The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can\'t be verified).';
    default:
      return 'Unknown reason';
  }
};
