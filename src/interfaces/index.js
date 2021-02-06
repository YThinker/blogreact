import fetch from './fetch';

export default {
    async getVerifyCode(params) {
        let actiontype = '/getVerifyCode';
        return fetch(actiontype, params, 'GET');
    },
    async getUserInfo(params) {
        let actiontype = '/getUserInfo';
        return fetch(actiontype, params, 'GET');
    }
};