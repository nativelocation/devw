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
  getTotalTime: async (projectId, period) => {
    let data = {};
    switch (period) {
      case 'today': {
        data = {
          fromDate: "20190110",
          toDate: "20190110",
          fromTime: "00:00",
          toTime: "23:59"
        }
      }
    }

    const results = await tw.projects.totalTime(data, projectId);

    if (results.projects.length <= 0) throw { msg: "No projects found" }
    return results.projects[0]['time-totals']['total-hours-sum']
  }
};

module.exports = model;
