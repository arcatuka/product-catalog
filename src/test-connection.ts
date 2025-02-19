import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Tuka 1803',
  database: 'product_management_db',
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Connected to the database successfully!');
  } catch (err) {
    console.error('Connection to the database failed:', err);
  } finally {
    await client.end();
  }
}

testConnection();
