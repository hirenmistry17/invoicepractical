const express = require("express");
const routes = require("./route/index.route");
var cors = require('cors')
const app = express();
const port = 3001;

require('./mongoes');

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use('/api/',routes);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
