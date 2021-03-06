const { WEBSOCKET_CONNECT, wsConnect } = require('../src');

const { describe, it } = require('mocha');
const chai = require('chai');

const { expect } = chai;

const url = 'http://www.google.it';

const socketActions = () => {
  describe('Socket Actions', () => {
    it('should create an action to connect websocket', () => {
      const expectedAction = {
        type: WEBSOCKET_CONNECT,
        url,
      };
      expect(wsConnect(url)).to.deep.equal(expectedAction);
    });
  });
};

export default socketActions;
