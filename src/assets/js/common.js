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
};