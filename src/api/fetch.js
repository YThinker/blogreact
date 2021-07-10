import axios from 'axios';
import {Alert} from '@/assets/component';

import store from "@/store/index";

export default async function fetch() {
    const res = await _request(...arguments).catch( err => {
        console.error(err);
        Alert.Error('Network Error');
    });
    if(res?.data.errorCode === 10001){
        // 跳转到登录页面 提示未登录
        Alert.Error('未登录');
        window._reacthistory.push('/login');
    } else if(res?.data.errorCode === 10002){
        // 提示权限不足
        Alert.Error('权限不足');
    } else if(res && res.data.errorCode !== 0){
        Alert.Error(res.data.message);
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