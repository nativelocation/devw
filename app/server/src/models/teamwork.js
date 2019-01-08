const tw = require("../config/teamwork");

const model = {
  getProjects: async () => {
    return await tw.projects.get({ status: "ALL" });
  },
  getPeople: async () => {
    return await tw.people.get({
      page: 1,
      pageSize: 50
    });
  },
  getTimeByUser: async data => {
    let { projectId, userId } = data;
    return await tw.projects.getTime(projectId, {
      userId: userId,
      fromDate: "20181226",
      toDate: "20181226",
      fromTime: "00:00",
      toTime: "23:59",
      projectType: "active"
    });
  }
};

module.exports = model;
