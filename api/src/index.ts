import 'reflect-metadata';
import './controllers/ItemController';

import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { InversifyExpressServer } from 'inversify-express-utils';
import { bootstrap } from './container/bootstrap';

dotenv.config();

const PORT = process.env.PORT || 8080;

const server = new InversifyExpressServer(bootstrap());
const app = server
  .setConfig((inlineApp) => {
    inlineApp.use(cors());
  })
  .build();
app.use(helmet());
app.use(express.json());
app.use(morgan('tiny'));

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
