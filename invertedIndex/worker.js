////worker.js
importScripts('https://cdn.jsdelivr.net/npm/pako@2.1.0/dist/pako.min.js');

self.onmessage = async function(e) {

switch(e.data.action){
case 'mapStr':
Lib = e.data.c;

break;
case 'compressLib':
    compressLib(e.data.path);
    break;
    case 'binToMap':
        console.log('received');

        binToMap(e.data.path);
        break;
        case 'searchLib':
            searchLib(e.data.w);
            break;
            case 'searchBook':
                searchBook(e.data.w);
                break;
}


}

let Lib;

let lib0 = new Map();
















 

function compressLib(e){
    

(async () => {
 

// Convert the input string to a Uint8Array
const inputBinary = stringToUint8Array(Lib);

// Compress the binary data using pako with maximum compression level
const compressedUint8Array = pako.deflate(inputBinary, { level: 9 });
        downloadBlob(compressedUint8Array, e, 'application/octet-stream');

})();

}

function uint8ArrayToString(arr) {
    // Use TextDecoder to convert the Uint8Array to a UTF-8 string
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(arr);
}

function downloadBlob(data, fileName, mimeType) {
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);

    postMessage({action:'blob',url:url,fn:fileName});
}

function stringToUint8Array(str) {
    const utf8 = unescape(encodeURIComponent(str));
    const arr = new Uint8Array(utf8.length);
    for (let i = 0; i < utf8.length; i++) {
        arr[i] = utf8.charCodeAt(i);
    }
    return arr;
}
let library;
function binToString(e) {
            const compressedData = new Uint8Array(e);
            const decompressedData = pako.inflate(compressedData);
            const originalString = uint8ArrayToString(decompressedData);
          library = originalString;

        };


        function searchLib(e){
        let uu = [];
for (let i = 1; i < lib0.size; i++) {
    const f = lib0.get(i);
    for (let a = 1; a < f.length; a++) {
        const p = lib0.get(i)[a][1].p;
        for(const d in p){
            const c = p[d]['c'];
       if(c&&c.includes(e)){
            uu.push([p[d],d,lib0.get(i)[a][0],lib0.get(i)[0]]); }   }
        }
    }
postMessage({action:'searchResult',response:uu});
}
function searchBook(e){
for (let i = 1; i < lib0.size; i++) {
const f = lib0.get(i);
    for(const d in f){
        const c = f[d][0];
   if(c&&c.includes(e)){
    postMessage({action:'searchResult',response:[c,f[d]]}); }   }
}
}

function searchAut(){
    for (const a in lib0){
        
    }
}

function binToMap(e){

    (async () => {
    try {
        console.log('fetching');

        const response = await fetch(e);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('wait');
        // Read the response as an ArrayBuffer
        const arrayBuffer = await response.arrayBuffer();
        console.log('1');

        // Convert the ArrayBuffer to a Uint8Array
        const compressedUint8Array = new Uint8Array(arrayBuffer);
        console.log('2');

        // Decompress the binary data using Pako
        const decompressedUint8Array = pako.inflate(compressedUint8Array);
        console.log('3');

        // Convert the decompressed Uint8Array back to a string
        const originalString = uint8ArrayToString(decompressedUint8Array);
        console.log('4');

        // Log the original string to console or use it as needed
        lib0 = new Map(JSON.parse(originalString));
        console.log('5');

        postMessage({action:'message',c:'map created!'});
    } catch (error) {
        postMessage({action:'error',er:error.message});
    }
})();
}