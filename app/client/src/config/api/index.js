import FetchRequest from './request';
import * as c from './constants';

class ApiModel {
    GetProjects = () => FetchRequest('GET');
    
}

export default new ApiModel();