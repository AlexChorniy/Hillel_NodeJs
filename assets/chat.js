let clients = [];

exports.subscribe = (req, res) => {
    console.log("subscribe", clients.length);
    // res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    clients = [...clients, res];
    //   res.on('close', function() {
    //     clients.splice(clients.indexOf(res), 1);
    //   });
};

exports.publish = (message) => {
    console.log("publish", message);
    clients.forEach((res) => {
        res.end(message);
    });
    clients = [];
};
