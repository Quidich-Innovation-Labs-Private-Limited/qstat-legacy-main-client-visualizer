class WebSocketConnection {
  constructor(appId) {
    this.socket = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${this.getWebsocketUrl()}`);

    this.addListeners(appId);
  }

  getWebsocketUrl() {
    const re = /https?:\/\//g;
    const isSecure = re.test("http://localhost:3001/api");

    let url;
    if (isSecure) {
      url = "http://localhost:3001/ws".replace(/(^\w+:|^)\/\//, '').replace('/api', '/ws');
    } else {
      url = `${window.location.host}${"http://localhost:3001/ws".replace(/(^\w+:|^)\/\//, '').replace('/api', '/ws')}`;
    }

    return url;
  }

  addListeners(appId) {
    // Connection opened
    this.socket.addEventListener('open', (event) => {
      console.log('connection established', event);
    });

    // Connection closed
    this.socket.addEventListener('close', (event) => {
      console.log('connection closed', event);
    });

    // Listen for possible errors
    this.socket.addEventListener('error', (event) => {
      console.log('WebSocket error: ', event);
    });
  }
}

export const createWebsocketConnection = (appId) => {
  return new WebSocketConnection(appId);
};