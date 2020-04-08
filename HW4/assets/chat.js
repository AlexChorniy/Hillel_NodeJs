let clients = [];
let DATA = [];

exports.subscribe = (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    clients = [...clients, res];

    res.on('close', function () {
        clients.splice(clients.indexOf(res), 1);
    });
};

exports.publish = obj => {
    DATA = [...DATA, obj];
    clients.forEach(res => {
        res.end(JSON.stringify(DATA));
    });
    clients = [];
};

exports.update = (res, req, obj) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    if (DATA.length && obj) {
        const changeIdx = parseInt(obj.changeTagIndex);
        DATA[changeIdx - 1].changeTag = !DATA[changeIdx - 1].changeTag;
        if (obj.changeValue) {
            DATA[changeIdx - 1].message = obj.changeValue;
        }
        res.end(JSON.stringify(DATA));
    }

};

exports.delete = (res, req, obj) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    if (DATA.length && obj) {
        const delIdx = parseInt(obj.deleteTagIndex);
        DATA = DATA.filter(item => item.time === delIdx ? '' : item);
        res.end(JSON.stringify(DATA));
    }

};
