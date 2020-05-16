const { createWriteStream } = require("fs");
const { join } = require('path');
const uuid = require('uuid');
// uuid.v4()
const unix = Date.now();
let MESSAGE_DATA = [];
let STATUS_CODES = [];
let USER_AGENT = [];
fLogMesBody = '';
rLogMesBody = '';
const INTERVAL = 60000;

const dayToday = () => {
    const addZero = num => num < 10 ? `0${num}` : num;
    const newDate = Date.now();
    const day = new Date(newDate).getDate();
    const month = new Date(newDate).getMonth() + 1;
    const year = new Date(newDate).getFullYear();
    const date = `${addZero(day)}_${addZero(month)}_${addZero(year)}`;
    return date;
};

setInterval(() => {
    const rLog = createWriteStream(join(__dirname, 'req_logs', `${dayToday()}.log`));
    const messageReq = `

        code: ${Date.now()}
        request_amount: ${MESSAGE_DATA.length}
        status_codes: ${STATUS_CODES}
        user_agent: ${USER_AGENT}
    `
    rLogMesBody += messageReq;
    rLog.write(rLogMesBody);
}, INTERVAL);

exports.logResponse = (start_time, end_time, status_code, ua, url) => {
    const fLog = createWriteStream(join(__dirname, 'f_logs', `${dayToday()}.log`));
    const timeSpend = ((end_time - start_time) / 1000).toFixed(3);

    const messageStr = `

    start_time: ${start_time}
    end_time: ${end_time}
    user_agent: ${ua}
    time_spend: ${timeSpend}
    url: ${url}
    status_code: ${status_code}
    `;
    fLogMesBody += messageStr;
    const messageObj = {
        start_time,
        end_time,
        user_agent: ua,
        time_spend: timeSpend,
        url,
        status_code,
    };
    STATUS_CODES = [...STATUS_CODES, status_code];
    USER_AGENT = [...USER_AGENT, ua];
    MESSAGE_DATA = [...MESSAGE_DATA, messageObj];
    fLog.write(fLogMesBody);
};