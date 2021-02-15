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
        const str = "1Aa1Bb2CcDdE2eFf3GgHh3Ii4Jj4KkLl5MmN9nOo5PpQq6RrSs0T6tUu7Vv7WwXx8Y8yZz9";
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
    },

    // PBKDF2加密
    PBKDF2Encrypt(str) {
        const salt = "cr1yptoWo2rdArr6ayrm18q";
        let key128Bits = cryptojs.PBKDF2(str, salt, {
            keySize: 128 / 32
        });
        return key128Bits.toString();
    },

    // 头尾增加随机len位数字符串混淆
    confusionStr(str, len=10) {
        return this.randomString(len)+str+this.randomString(len);
    },
};