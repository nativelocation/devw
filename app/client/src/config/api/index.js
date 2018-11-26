import FetchRequest from './request';
import * as c from './constants';

class ApiModel {
    Login = credentials => FetchRequest(c.LOGIN, 'POST', null, credentials);
    GetUserToken = token => FetchRequest(c.GETCURRENT, 'GET', token);
    GetUser = (token, id) => FetchRequest(c.GETUSER, 'GET', token);
    GetUsers = token => FetchRequest(c.GETUSERS, 'GET', token);
    GetTeam = (token, id) => FetchRequest(`${c.GETTEAM}/${id}`, 'GET', token);
    GetTeams = token => FetchRequest(c.GETTEAMS, 'GET', token);
    CreateUser = (token, user) => FetchRequest(c.CREATEUSER, 'POST', token, user, {});
    CreateTeam = (token, team) => FetchRequest(c.CREATETEAM, 'POST', token, team);
    UpdateTeam = (token, team) => FetchRequest(c.UPDATETEAM, 'POST', token, team);
    DeleteTeam = (token, team) => FetchRequest(c.DELETETEAM, 'POST', token, team);
}

export default new ApiModel();