export default {
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
};