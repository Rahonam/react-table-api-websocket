const CHANNEL_URL = 'wss://production-esocket.delta.exchange';

export const socketInstance = new WebSocket(CHANNEL_URL);

/**
 * subscribe to 'v2/ticker' channel for provided symbols
 * @param {WebSocket} socketInstance an instance of WebSocket
 * @param {Array<string>} productSymbols list of product's symbols
 */
export const subscribeTicker = (socketInstance,productSymbols) => {
    if (socketInstance.readyState === WebSocket.OPEN) {
        const payload = {
            type: 'subscribe', 
            payload:{
                channels:[
                    {
                        name: "v2/ticker", 
                        symbols: [...productSymbols]
                    }
                ]
            }
        };
        socketInstance.send(JSON.stringify(payload));
    } else if (socketInstance.readyState === WebSocket.CONNECTING) {
        socketInstance.addEventListener('open', () => subscribeTicker(socketInstance,productSymbols));
    }
};