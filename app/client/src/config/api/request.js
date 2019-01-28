import { BASE_URL, FETCH_TIMEOUT } from './constants';

export const Headers = (token, customBase) => {
    let base = customBase || { 'Content-Type': 'application/json' };
    if (token) base.Authorization = token;
    return base;
}

export function Request(url, object) {
    return new Promise((resolve, reject) => {
        let timer = setTimeout(() => reject(new Error('Request timed out')), FETCH_TIMEOUT);
        fetch(url, object).then(res => res.json())
            .then(res => { clearTimeout(timer); resolve(res) })
            .catch(err => { clearTimeout(timer); reject(err); })
        // .finally(() => clearTimeout(timer));
    })
}

export default function FetchRequest(endpoint, method, token, data, customBase) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = Headers(token, customBase);
    const dataParse = data instanceof FormData ? data : JSON.stringify(data);
    const body = method !== 'GET' ? dataParse : null;

    return Request(url, { method, headers, body });
}
