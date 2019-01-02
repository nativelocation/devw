const tw = require('teamwork-api')('twp_GyX8Zgke05Wd4hHigpr6BN32ckvp', 'https://serpicodev.teamwork.com');

tw.projects.get({
	status: 'ALL'
}).then(res => {
    console.log('Projects ',res);
}).catch(err => {
    console.log('Error ', err);
});