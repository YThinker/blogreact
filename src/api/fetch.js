import axios from 'axios';
import alert from '@/assets/component/alert';

import store from "@/store/index";

export default async function fetch() {
    const res = await _request(...arguments).catch( err => {
        console.error(err);
        alert().open({content: 'Network Error', type: 'warning'});
    });
    if(res?.data.errorCode === 10001){
        // 跳转到登录页面 提示未登录
        alert().open({content: '未登录', type: 'warning'});
        window._reacthistory.push('/login');
    } else if(res?.data.errorCode === 10002){
        // 提示权限不足
        alert().open({content: '权限不足', type: 'warning'});
    } else if(res && res.data.errorCode !== 0){
        alert().open({content: res.data.message, type: 'error'});
    }
    return res;
}

const _request = ( url='', data={}, method='POST', responseType='' ) => {
    let token = store.getState().user.token;

    return axios.request({
        url: url,
        method: method,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "TempAuth": sessionStorage.getItem("verifyTempAuth"),
            "Authorization": `Bearer ${token}`,
        },
        data: data,
        params: method === 'GET' ? data : null,
        responseType: responseType,
    });
}