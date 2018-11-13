import { BASE_URL, FETCH_TIMEOUT } from './constants';

export const Headers = (token, customBase) => {
    let base = customBase || { 'Content-Type': 'application/json' }
    if (token) base.Authorization = token;
    return base;
}

export function Request(url, object) {
    return new Promise((resolve, reject) => {
        let timer = setTimeout(() => reject(new Error('Request timed out')), FETCH_TIMEOUT);
        fetch(url, object).then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
            .finally(() => clearTimeout(timer));
    })
}

export default function FetchRequest(endpoint, method, data, customHeaders) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = customHeaders || Headers();
    const body = method !== 'GET' ? JSON.stringify(data) : null;

    return Request(url, { method, headers, body });
}

