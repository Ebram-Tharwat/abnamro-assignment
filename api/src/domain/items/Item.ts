export default interface Item {
  name: string;
  description: string;
  parent: Item | null;
}
