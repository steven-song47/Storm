// import fetch from 'dva/fetch';
import { request } from 'umi';


export async function post(url, options) {
    options.headers = {
        'Content-Type': 'application/json',
    };
    options.method = 'POST';
    options.body = JSON.stringify(options.params);
    return request(url, options);
}

// export async function postForm(url, options) {
//     options.headers = {
//         'Content-Type': 'application/x-www-form-urlencoded',
//     };
//     options.method = 'POST';
//     options.body = options.params;
//     const response = await fetch(url, options);
//     return response.status;
// }

export async function put(url, options) {
    options.headers = {
        'Content-Type': 'application/json',
    };
    options.method = 'PUT';
    options.body = JSON.stringify(options.params);
    return request(url, options);
}