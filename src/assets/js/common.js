import cryptojs from 'crypto-js';

export default {
    // 深拷贝
    deepClone(obj) {
        let objCopy = {};
        if(typeof obj !== 'object'){
            return;
        }
        for(let key in obj){
            if(typeof obj[key] === 'object'){
                objCopy[key] = this.deepClone(obj[key]);
            } else objCopy[key] = obj[key];
        }
        return objCopy;
    },

    // 随机字符串
    randomString(len=20, isNum=false) {
        const str = "Aa1BbCcDdE2eFfGgHh3IiJj4KkLlMmNnOo5PpQqRrSs0T6tUuVv7WwXxY8yZz9";
        const strLen = str.length;
        let secret = '';
        for( let i = 0; i < len; i++ ){
            let j = Math.floor(Math.random()*strLen);
            if(isNum){
                secret += str.charCodeAt(j).toString();
            } else {
                secret += str.charAt(j);
            }
        }
        return secret;
    },

    // AES解密
    Decrypt(str) {
        var key = "AE88mn7qytlJK82g";
        var iv = "1432359987651784"
        var decrypted = cryptojs.AES.decrypt(str, cryptojs.enc.Utf8.parse(key), {
            iv: cryptojs.enc.Utf8.parse(iv),
            mode: cryptojs.mode.CBC,
            padding: cryptojs.pad.Pkcs7
        });
        decrypted = cryptojs.enc.Utf8.stringify(decrypted);
        return decrypted;
    }　
};