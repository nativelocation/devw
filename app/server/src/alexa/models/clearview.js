const tw = require("../../config/teamwork");
const pg = require('../../config/postgress');
const moment = require("moment");

const model = {
  getProjects: async () => {
    return await tw.projects.get({ status: "ALL" });
  },
  getStatusUpdate: async projectId => {
    const cleanHtml = str => {
      if (!str) return false;
      str = str.toString();
      return str.replace(/<[^>]*>/g, '');
    }

    return new Promise((resolve, reject) => {
      pg.connect()
      pg.query(`select * from projects where project_id = '${projectId}'`, (err, res) => {
        if (!err && res.rowCount > 0) {
          let { id } = res.rows[0];
          pg.query(`select * from statuses where project_id = '${id}' ORDER BY updated_at desc limit 1`, (err, res) => {
            if (!err && res.rowCount > 0) {
              resolve(cleanHtml(res.rows[0].description));
              // console.log(res.rows[0].description)
            } else resolve();
            pg.end()
          });
        } else {
          pg.end()
          resolve();
        }
      })
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
        data.fromDate = moment().startOf('month').format("YYYYMMDD");
        data.toDate = moment().endOf('month').format("YYYYMMDD");
        break;
      }
      case 'last month': {
        data.fromDate = moment().subtract(1, 'month').startOf('month').format("YYYYMMDD");
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
        data.fromDate = moment().startOf('year').format("YYYYMMDD");
        data.toDate = moment().endOf('year').format("YYYYMMDD");
        break;
      }
      case 'last year': {
        data.fromDate = moment().subtract(1, 'year').startOf('year').format("YYYYMMDD");
        data.toDate = moment().subtract(1, 'year').endOf('year').format("YYYYMMDD");
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
