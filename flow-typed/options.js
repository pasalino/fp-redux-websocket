declare type Options = {
  heartbeat?: boolean;
  heartbeatMessage?: string;
  heartbeatInterval?: number;
  autoReconnect?: boolean,
  intervalReconnect?: number,
  useMessageAsReduxAction?: boolean
};
