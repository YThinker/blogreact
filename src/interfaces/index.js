import fetch from './fetch';

export default {
    //获取验证码
    async getVerifyCode(params) {
        let actiontype = '/getVerifyCode';
        return fetch(actiontype, params, 'GET');
    },
    // 获取用户信息
    async getUserInfo(params) {
        let actiontype = '/getUserInfo';
        return fetch(actiontype, params, 'GET');
    },
    // 登录
    async login(params) {
        let actiontype = '/login';
        return fetch(actiontype, params);
    },
    // 校验是否已被注册
    async validateRegisted(params) {
        let actiontype = '/validateRegisted';
        return fetch(actiontype, params, 'GET');
    },
    // 注册
    async register(params) {
        let actiontype = '/register';
        return fetch(actiontype, params);
    },
    // 获取密保问题
    async getSecurityQuestion(params) {
        let actiontype = '/getSecurityQuestion';
        return fetch(actiontype, params, 'GET');
    },
    // 忘记密码
    async forgetPwd(params){
        let actiontype = '/forgetPwd';
        return fetch(actiontype, params);
    },
    // 获取可公开用户信息
    async getUserInfoSecurity(params){
        let actiontype = '/getUserInfoSecurity';
        return fetch(actiontype, params, 'GET');
    },
};