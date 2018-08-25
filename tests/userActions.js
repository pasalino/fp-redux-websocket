const { WEBSOCKET_DISCONNECT, WEBSOCKET_SEND_MESSAGE } = require('../src/action');
const { sendMessage, sendObject, wsDisconnect } = require('../src');

const { WEBSOCKET_CONNECT, wsConnect } = require('../src');

const { describe, it } = require('mocha');
const chai = require('chai');

const { expect } = chai;

const url = 'http://www.google.it';
const simpleMessage = 'hello!';

const userActions = () => {
  describe('User Actions', () => {
    it('should create an action to connect websocket', () => {
      const expectedAction = {
        type: WEBSOCKET_CONNECT,
        url,
      };
      expect(wsConnect(url)).to.deep.equal(expectedAction);
    });
    it('should create an action to disconnect websocket with url', () => {
      const expectedAction = {
        type: WEBSOCKET_DISCONNECT,
        url,
      };
      expect(wsDisconnect(url)).to.deep.equal(expectedAction);
    });
    it('should create an action to disconnect websocket without url', () => {
      const expectedAction = {
        type: WEBSOCKET_DISCONNECT,
      };
      expect(wsDisconnect()).to.deep.equal(expectedAction);
      expect(wsDisconnect(null)).to.deep.equal(expectedAction);
    });
    it('should create an action to send message with url', () => {
      const expectedAction = {
        type: WEBSOCKET_SEND_MESSAGE,
        message: simpleMessage,
        url,
      };
      expect(sendMessage(simpleMessage, url)).to.deep.equal(expectedAction);
    });
    it('should create an action to send message without url', () => {
      const expectedAction = {
        type: WEBSOCKET_SEND_MESSAGE,
        message: simpleMessage,
      };
      expect(sendMessage(simpleMessage)).to.deep.equal(expectedAction);
      expect(sendMessage(simpleMessage, null)).to.deep.equal(expectedAction);
    });
    it('should create an action to send object with url', () => {
      const objectToSend = { test: 'Hello' };
      const expectedAction = {
        type: WEBSOCKET_SEND_MESSAGE,
        message: JSON.stringify(objectToSend),
        url,
      };
      expect(sendObject(objectToSend, url)).to.deep.equal(expectedAction);
    });
    it('should create an action to send object without url', () => {
      const objectToSend = { test: 'Hello' };
      const expectedAction = {
        type: WEBSOCKET_SEND_MESSAGE,
        message: JSON.stringify(objectToSend),
      };
      expect(sendObject(objectToSend)).to.deep.equal(expectedAction);
      expect(sendObject(objectToSend, null)).to.deep.equal(expectedAction);
    });
  });
};

export default userActions;
