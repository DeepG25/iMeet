const express = require('express');
const path = require('path');

const app = express();
const routes = express.Router();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'/client')));

routes.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname,'/client/index.html'));
});

app.use(routes);
app.listen(port);