import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import config from './config/config';

const app = express();

const { port, env } = config;

// Log requests to the console
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up a default catch-all route
app.get('*', (req, res) => {
    res.json({ message: 'welcome to default routes' })
});

if (env !== 'test') {
    app.listen(port, () => {
        console.log(`Server starting on port: ${port}`);
    });
}


export default app;