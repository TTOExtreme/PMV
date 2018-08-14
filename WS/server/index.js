const createServer = require('./server')
const config = require('../config')

const app = createServer()
console.log(("Listening on internal port: " + config.api.portws).gray);
app.listen(config.api.portws)