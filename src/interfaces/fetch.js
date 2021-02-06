import axios from 'axios';

const url = 'http://127.0.0.1:7001';

export default async function fetch() {
    const res = await _request(...arguments).catch( err => console.error(err) );
    console.log(res);
    if(res){
        if(res.data.ErrorCode === 10001){
            // 跳转到登录页面 提示未登录
            window._reacthistory.push('/login');
        } else if(res.data.ErrorCode === 10002){
            // 提示权限不足
        }
    } else {
        // 提示网络错误
    }
    return res;
}

const _request = ( actiontype='', data={}, method='POST', responseType='' ) => {
    return axios.request({
        url: `${url}${actiontype}`,
        method: method,
        data: data,
        responseType: responseType,
        withCredentials:true,
    });
}