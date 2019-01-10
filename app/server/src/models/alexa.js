const tw = require("../config/teamwork");
const moment = require("moment");

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
    let data = {
      fromTime: "00:00",
      toTime: "23:59"
    };
    console.log('projectId,period :', projectId, period);
    switch (period) {
      case 'today': {
        const today = moment().format("YYYYMMDD");
        data.fromDate = today;
        data.toDate = today;
        break;
      }
      case 'yesterday': {
        const today = moment().subtract(1, 'days').format("YYYYMMDD");
        data.fromDate = today;
        data.toDate = today;
        break;
      }
      case 'this month': {
        data.fromDate = moment().format("YYYYMM01");
        data.toDate = moment().endOf('month').format("YYYYMMDD");
        break;
      }
      case 'last month': {
        data.fromDate = moment().subtract(1, 'month').format("YYYYMM01");
        data.toDate = moment().subtract(1, 'month').endOf('month').format("YYYYMMDD");
        break;
      }
      case 'this week': {
        data.fromDate = moment().startOf('week').format("YYYYMMDD");
        data.toDate = moment().endOf('week').format("YYYYMMDD");
        break;
      }
      case 'last week': {
        data.fromDate = moment().subtract(1, 'week').startOf('week').format("YYYYMMDD");
        data.toDate = moment().subtract(1, 'week').endOf('week').format("YYYYMMDD");
        break;
      }
      case 'this year': {
        data.fromDate = moment().endOf('year').format("YYYYMMDD");
        data.toDate = moment().startOf('year').format("YYYYMMDD");
        break;
      }
      case 'last year': {
        data.fromDate = moment().subtract(1, 'year').endOf('year').format("YYYYMMDD");
        data.toDate = moment().subtract(1, 'year').startOf('year').format("YYYYMMDD");
        break;
      }
      default: {
        data = {};
      }
    }
    console.log('data :', data);
    const results = await tw.projects.totalTime(data, projectId);

    if (results.projects.length <= 0) throw { msg: "No projects found" }
    return results.projects[0]['time-totals']['total-hours-sum']
  }
};

module.exports = model;
