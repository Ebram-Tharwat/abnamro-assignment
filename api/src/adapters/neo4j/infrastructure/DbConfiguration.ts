export default interface DbConfiguration {
  url: string;
  username: string;
  password: string;
}

export const readFromEnv = (): DbConfiguration => ({
  url: process.env.NEO4J_URL || 'bolt://localhost:7687',
  username: process.env.NEO4J_USERNAME || '',
  password: process.env.NEO4J_PASSWORD || '',
});
