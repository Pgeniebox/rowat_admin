let message='none';
setInterval(() => {
     const timestamp = new Date().getTime();
    importScripts(`js?t=${timestamp}`);
postMessage(message);
}, 5000);
