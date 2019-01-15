const tw = require("../../config/teamwork");
const pg = require('../../config/postgress');
const db = require('../../config/mongoose');
const moment = require("moment");

const model = {
  getProjects: async () => {
    return await tw.projects.get({ status: "ALL" });
  },
  getStatusUpdate: async projectId => {
    const pqClient = pg.newClient();
    const cleanHtml = str => {
      if (!str) return false;
      str = str.toString();
      return str.replace(/<[^>]*>/g, '');
    }

    await pqClient.connect()
    const query = `select p.id, p.project_id, s.description from projects as p inner join statuses as s on p.id=s.project_id where p.project_id = '${projectId}' ORDER BY s.updated_at desc limit 1`;
    const res = await pqClient.query(query);
    await pqClient.end()

    if (res.rowCount > 0) {
      let { description } = res.rows[0];
      return cleanHtml(description);
    } else return;
  },
  getUserByAlexaId: async alexaUserId => {
    const result = await db.ClearviewAlexa.findOne({ alexaUserId });
    return result;
  },
  registerUser: async (alexaUserId, clearviewUserId) => {
    await db.ClearviewAlexa.findOneAndDelete({ alexaUserId });
    const item = new db.ClearviewAlexa({ alexaUserId, clearviewUserId });
    return await item.save();
  },
  removeUser: async (alexaUserId) => {
    return await db.ClearviewAlexa.findOneAndDelete({ alexaUserId });
  },
  getUserByPinOrId: async (value, isUserId) => {
    const pqClient = pg.newClient();
    const where = `where u.${isUserId ? 'id' : 'pin'} = '${value}'`;
    const query = `select u.id, u.email, u.name, u.project_id as projectId, p.project_id as twId, p.name as projectName from users as u inner join projects as p on u.project_id=p.id ${where}`;

    await pqClient.connect()
    const res = await pqClient.query(query);
    await pqClient.end();

    if (res.rowCount > 0) return res.rows[0];
  },
  getTotalTime: async (projectId, period) => {
    let data = {
      fromTime: "00:00",
      toTime: "23:59"
    };
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
    const results = await tw.projects.totalTime(data, projectId);
    if (results.projects.length <= 0) throw { msg: "No projects found" }
    return results.projects[0]['time-totals']['total-hours-sum']
  }
};

module.exports = model;
