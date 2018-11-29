import FetchRequest from './request';
import * as c from './constants';

class ApiModel {
    Login = credentials => FetchRequest(c.LOGIN, 'POST', null, credentials);
    GetUserToken = token => FetchRequest(c.GETCURRENT, 'GET', token);
    GetUser = (token, _id) => FetchRequest(c.GETUSER, 'POST', token, { _id });
    GetUsers = token => FetchRequest(c.GETUSERS, 'GET', token);
    CreateUser = (token, user) => FetchRequest(c.CREATEUSER, 'POST', token, user, {});
    UpdateUser = (token, user) => FetchRequest(c.UPDATEUSER, 'PUT', token, user, {});
    DeleteUser = (token, _id) => FetchRequest(c.DELETEUSER, 'DELETE', token, { _id });

    GetTeam = (token, id) => FetchRequest(`${c.GETTEAM}/${id}`, 'GET', token);
    GetTeams = token => FetchRequest(c.GETTEAMS, 'GET', token);
    CreateTeam = (token, team) => FetchRequest(c.CREATETEAM, 'POST', token, team);
    UpdateTeam = (token, team) => FetchRequest(c.UPDATETEAM, 'PUT', token, team);
    DeleteTeam = (token, team) => FetchRequest(c.DELETETEAM, 'DELETE', token, team);
}

export default new ApiModel();