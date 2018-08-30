import { Client } from 'pg';

export const client = new Client({
  connectionString: 'postgresql://umar:farooq@localhost:5432/stackoverflowlite',
});

client.connect((err) => {
  if (err) {
    console.log('connection error', err.stack);
  } else {
    console.log('connected to database');
  }
});

export default { client };
