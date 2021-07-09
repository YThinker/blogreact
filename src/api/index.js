import fetch from './fetch';

export default {
    //获取验证码
    async getVerifyCode(params) {
        let url = '/commonapi/getImageCaptcha';
        return fetch(url, params, 'GET');
    },
    // 获取用户信息
    async getUserInfo(params) {
        let url = '/getUserInfo';
        return fetch(url, params, 'GET');
    },
    // 登录
    async login(params) {
        let url = '/login';
        return fetch(url, params);
    },
    // 校验是否已被注册
    async validateRegisted(params) {
        let url = '/validateRegisted';
        return fetch(url, params, 'GET');
    },
    // 注册
    async register(params) {
        let url = '/register';
        return fetch(url, params);
    },
    // 获取密保问题
    async getSecurityQuestion(params) {
        let url = '/getSecurityQuestion';
        return fetch(url, params, 'GET');
    },
    // 忘记密码
    async forgetPwd(params){
        let url = '/forgetPwd';
        return fetch(url, params);
    },
    // 获取可公开用户信息
    async getUserInfoSecurity(params){
        let url = '/getUserInfoSecurity';
        return fetch(url, params, 'GET');
    },
};