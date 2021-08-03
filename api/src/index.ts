import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('tiny'));
app.use('/', (req, res) => res.status(200).send('Hello there!'));

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
