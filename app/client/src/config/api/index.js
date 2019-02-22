import FetchRequest from './request';
import * as c from './constants';

class ApiModel {
    Login = credentials => FetchRequest(c.LOGIN, 'POST', null, credentials);
    //User
    GetUserToken = token => FetchRequest(c.GETCURRENT, 'GET', token);
    EmailValidation = (token, data) => FetchRequest(c.EMAILVALIDATION, 'POST', token, data);
    CreateUser = (token, data) => FetchRequest(c.CREATEUSER, 'POST', token, data);
    GetAllUser = token => FetchRequest(c.GETALLUSERS, 'GET', token);
    GetUser = (token, _id) => FetchRequest(c.GETUSER, 'POST', token, { _id });
    UpdateUser = (token, data) => FetchRequest(c.UPDATEUSER, 'PUT', token, data);
    DeleteUser = (token, _id) => FetchRequest(c.DELETEUSER, 'DELETE', token, { _id });

    GetProjects = token => FetchRequest(c.GETPROJECT, 'GET', token);
    GetPeople = token => FetchRequest(c.GETPEOPLE, 'GET', token);
    GetTimeByUser = (token, data) => FetchRequest(c.GETTIMEBYUSER, 'POST', token, data);
    GetTimeAll = (token, data) => FetchRequest(c.GETTIMEALL, 'POST', token, data);
    GetTotalTimeByDate = (token, data) => FetchRequest(c.GETTOTALTIMEBYDATE, 'POST', token, data);
    GetAllDeveloper = token => FetchRequest(c.GETALLDEVELOPER, 'GET', token);
    GetDeveloperByApiId = (token, data) => FetchRequest(c.DETDEVELOPERBYAPIID, 'POST', token, data);
    CreateDeveloper = (token, data) => FetchRequest(c.CREATEDEVELOPER, 'POST', token, data);
    DeleteDeveloper = (token, data) => FetchRequest(c.DELETEDEVELOPER, 'POST', token, data);
    UpdateDeveloper = (token, data) => FetchRequest(c.UPDATEDEVELOPER, 'POST', token, data);
    //Goals
    GetGoals = token => FetchRequest(c.GETALLGOALS, 'GET', token);
    GetGoalsToday = token => FetchRequest(c.GETGOALSTODAY, 'GET', token);
    CreateGoal = (token, data) => FetchRequest(c.CREATEGOAL, 'POST', token, data);
    UpdateGoal = (token, data) => FetchRequest(c.UPDATEGOAL, 'PUT', token, data);
    DeleteGoal = (token, _id) => FetchRequest(c.DELETEGOAL, 'DELETE', token, { _id });
    LogicDeleteGoal = (token, data) => FetchRequest(c.LOGICDELETEGOAL, 'PUT', token, data);
}

export default new ApiModel();