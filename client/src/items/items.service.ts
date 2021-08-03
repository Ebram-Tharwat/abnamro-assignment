import axios from 'axios';
import Item from './item';

const apiURL = `${process.env.REACT_APP_API_BASE_URL}/api`;
export default class ItemsService {
  public async getAll(): Promise<Item[]> {
    const { data } = await axios.get<Item[]>(`${apiURL}/items`);
    return data;
  }
}
