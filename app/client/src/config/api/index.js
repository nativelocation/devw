import FetchRequest, { Headers } from './request';
import * as c from './constants';

class ApiModel {
    Login = credentials => FetchRequest(c.LOGIN, 'POST', null, credentials);
    GetUser = token => FetchRequest(c.GETCURRENT, 'GET', token);
    GetUsers = token => FetchRequest(c.GETUSERS, 'GET', token);
}

export default new ApiModel();
