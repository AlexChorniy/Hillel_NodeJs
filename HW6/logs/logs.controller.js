const { createWriteStream } = require("fs");
const { join } = require('path');
const uuid = require('uuid');
// uuid.v4()
const unix = Date.now();
let MESSAGE_DATA = [];
let STATUS_CODES = [];
let USER_AGENT = [];
const INTERVAL = 60000;

exports.logResponse = (start_time, end_time, status_code, ua, url) => {
    const fLog = createWriteStream(join(__dirname, 'f_logs', `${unix}.log`));
    const rLog = createWriteStream(join(__dirname, 'req_logs', `${unix}.log`));
    const timeSpend = ((end_time - start_time) / 1000).toFixed(3);
    const messageStr = `
    start_time: ${start_time}
    end_time: ${end_time}
    user_agent: ${ua}
    time_spend: ${timeSpend}
    url: ${url}
    status_code: ${status_code}
    `;
    const messageObj = {
        start_time,
        end_time,
        user_agent: ua,
        time_spend: timeSpend,
        url,
        status_code,
    };
    const messageReq = `
        code: ${Date.now()}
        request_amount: ${MESSAGE_DATA.length}
        status_codes: ${[...STATUS_CODES, status_code]}
        user_agent: ${[...USER_AGENT, ua]}
    `
    MESSAGE_DATA = [...MESSAGE_DATA, messageObj];
    fLog.write(messageStr);
    setInterval(() => {
        rLog.write(messageReq);
        console.log('MESSAGE_DATA', MESSAGE_DATA.length);
    }, INTERVAL);

};