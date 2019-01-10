const tw = require("../config/teamwork");

const model = {
  getProjects: async () => {
    return await tw.projects.get({ status: "ACTIVE" });
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
      // userId: 0,
      fromDate: "20181226",
      toDate: "20181226",
      fromTime: "00:00",
      toTime: "23:59",
      projectType: "active"
    });
  },
  getTimeAll: async data => {
    //User = 150910
    return await tw.time.get({
      page: 1,
      pageSize: 500,
      fromDate: "20181226",
      toDate: "20181226",
      fromTime: "00:00",
      toTime: "23:59"
    });
  },
  getTotalTimeByDate: async data => {
    const { userId, fromDate, toDate, fromTime, toTime } = data;
    return await tw.projects.totalTime(
      {
        userId,
        fromDate,
        toDate,
        fromTime,
        toTime
      }
    );
  }
};

module.exports = model;
