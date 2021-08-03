import fs from 'fs';
import * as dotenv from 'dotenv';
import { readFromEnv } from '../infrastructure/DbConfiguration';
import DbConnectionFactory from '../infrastructure/DbConnectionFactory';

const cypher = (file: string) => {
  const buffer = fs.readFileSync(`${__dirname}/${file}.cypher`);
  return buffer.toString();
};

const migrate = async (file: string) => {
  const connection = new DbConnectionFactory(readFromEnv());
  connection.openSession(async (session) => {
    try {
      await session.run(cypher(file));
      console.info('Migration script run correctly.');
      process.exit(0);
    } catch (error) {
      console.error(error);
    }
  });
};

dotenv.config();
migrate('seed');
