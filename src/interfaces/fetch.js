import axios from 'axios';
import alert from '@/assets/component/alert';

const url = 'http://127.0.0.1:7001';

export default async function fetch() {
    const res = await _request(...arguments).catch( err => console.error(err) );
    console.log(res);
    if(res && res.data.ErrorCode === 10001){
        // 跳转到登录页面 提示未登录
        alert().open({content: '未登录', type: 'warning'});
        window._reacthistory.push('/login');
    } else if(res && res.data.ErrorCode === 10002){
        // 提示权限不足
        alert().open({content: '权限不足', type: 'warning'});
    } else if(res && res.data.ErrorCode !== 200){
        alert().open({content: res.data.message, type: 'error'});
    }
    return res;
}

const _request = ( actiontype='', data={}, method='POST', responseType='' ) => {
    return axios.request({
        url: `${url}${actiontype}`,
        method: method,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "TempAuth": sessionStorage.getItem("verifyTempAuth"),
        },
        data: data,
        params: method === 'GET' ? data : null,
        responseType: responseType,
    });
}