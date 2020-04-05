let clients = [];

exports.subscribe = (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    clients = [...clients, res];
    res.on('close', function () {
        clients.splice(clients.indexOf(res), 1);
    });
};

exports.publish = (message) => {
    clients.forEach(res => {
        res.end(message);
    });
    clients = [];
};
