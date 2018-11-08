import FetchRequest, { Headers } from './request';
import * as c from './constants';

class ApiModel {
    Login = (credentials) => FetchRequest(c.LOGIN, 'POST', credentials);
    GetUser = (token) => FetchRequest(c.GETCURRENT, 'GET', null, Headers(token));
    GetAll = (token) => FetchRequest(c.GETALL, 'GET', null, Headers(token));
}

export default new ApiModel();
