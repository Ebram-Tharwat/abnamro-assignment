import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { itemController } from './controllers/ItemController';

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/items', itemController);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
