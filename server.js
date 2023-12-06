import express from 'express'
const app = express();

import indexRoute from './routes/index.js'

app.use('/', indexRoute);

const PORT = 5200;

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`);
})
