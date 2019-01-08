import FetchRequest from './request';
import * as c from './constants';

class ApiModel {
    Login = credentials => FetchRequest(c.LOGIN, 'POST', null, credentials);
    GetUserToken = token => FetchRequest(c.GETCURRENT, 'GET', token);
    GetProjects = token => FetchRequest(c.GETPROJECT, 'GET', token);
    GetPeople = token => FetchRequest(c.GETPEOPLE, 'GET', token);
    GetTimeByUser = (token, data) => FetchRequest(c.GETTIMEBYUSER, 'POST', token, data);
    
}

export default new ApiModel();