import 'idempotent-babel-polyfill';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import debug from 'debug';
import swaggerUi from 'swagger-ui-express';
import config from './config/config';
import Routes from './routes/routes';
import swaggerDocument from '../swagger';


const app = express();

const { port, env } = config;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const Debug = debug('http');
// Routes(app);
app.use('/api/v1', Routes);

app.get('/', (req, res) => {
  res.json({ message: 'welcome to default routes' });
});

app.listen(port, () => {
  Debug(`Server starting on port: ${port}`);
});

export default app;
