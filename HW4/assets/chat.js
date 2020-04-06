let clients = [];

exports.subscribe = (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    clients = [...clients, res];
    //console.log('chat.js clients', clients);
    res.on('close', function () {
        clients.splice(clients.indexOf(res), 1);
    });
};

exports.publish = (body) => {
    clients.forEach(res => {
        res.end(JSON.stringify(body));
    });
    clients = [];
};
