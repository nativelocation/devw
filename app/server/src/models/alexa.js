const tw = require("../config/teamwork");

const model = {
  getProjects: async () => {
    return await tw.projects.get({ status: "ALL" });
  },
  getTimeAll: async data => {
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
    const { projectId, fromDate, toDate, fromTime, toTime } = data;
    return await tw.projects.totalTime(
      {
        // fromDate,
        // toDate,
        // fromTime,
        // toTime
      }, projectId
    );
  }
};

module.exports = model;
