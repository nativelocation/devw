import FetchRequest from "./request";
import * as c from "./constants";

class ApiModel {
	Login = credentials => FetchRequest(c.LOGIN, "POST", null, credentials);
	//User
	GetUserToken = token => FetchRequest(c.GETCURRENT, "GET", token);
	EmailValidation = (token, data) => FetchRequest(c.EMAILVALIDATION, "POST", token, data);
	CreateUser = (token, data) => FetchRequest(c.CREATEUSER, "POST", token, data);
	GetAllUser = token => FetchRequest(c.GETALLUSERS, "GET", token);
	GetUser = (token, _id) => FetchRequest(c.GETUSER, "POST", token, { _id });
	UpdateUser = (token, data) => FetchRequest(c.UPDATEUSER, "PUT", token, data);
	DeleteUser = (token, _id) => FetchRequest(c.DELETEUSER, "DELETE", token, { _id });

	//Goals
	GetGoals = token => FetchRequest(c.GETALLGOALS, "GET", token);
	GetGoalsByDate = (token, data) => FetchRequest(c.GETGOALSBYDATE, "POST", token, data);
	GetGoalsByPriority = (token, data) => FetchRequest(c.GETGOALSBYPRIORITY, "POST", token, data);
	CreateGoal = (token, data) => FetchRequest(c.CREATEGOAL, "POST", token, data);
	UpdateGoal = (token, data) => FetchRequest(c.UPDATEGOAL, "PUT", token, data);
	UpdateGoalDate = (token, data) => FetchRequest(c.UPDATEGOALDATE, "PUT", token, data);
	UpdateGoalsPriority = (token, data) => FetchRequest(c.UPDATEGOALSPRIORITY, "PUT", token, data);
	DeleteGoal = (token, _id) => FetchRequest(c.DELETEGOAL, "DELETE", token, { _id });
	LogicDeleteGoal = (token, data) => FetchRequest(c.LOGICDELETEGOAL, "PUT", token, data);
}

export default new ApiModel();
