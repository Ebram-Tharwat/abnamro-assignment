import express, { Request, Response } from 'express';
import ItemRepository from '../adapters/neo4j/repositories/ItemRepository';
import { Item } from '../domain/items';

export const itemController = express.Router();

itemController.get('/', async (req: Request, res: Response) => {
  try {
    const repo = new ItemRepository();
    const items: Item[] = await repo.getAll();
    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
