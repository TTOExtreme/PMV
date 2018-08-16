const createServer = require('./server')
const config = require('../config')
const cluster = require('cluster');

const os = require('os');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log("This machine has " + numCPUs + " CPUs.");
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("online", (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
        console.log("Starting a new worker...");
        cluster.fork();
    });

} else {
    const app = createServer()
    app.listen(config.api.portws, () => {
        console.log(("Listening on internal port: " + config.api.portws).gray);
    })
}