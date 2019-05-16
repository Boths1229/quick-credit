import { Pool } from 'pg';
import debug from 'debug';

class Model {
  constructor(table) {
    this.table = table;

    this.pool = new Pool();

    this.pool.on('error', (err, client) => {
      console.log('errooor');
    });
  }

  async select(columns, clause) {
    let query;
    if (clause) {
      query = `SELECT ${columns} FROM ${this.table} WHERE ${clause}`;
    } else {
      query = `SELECT ${columns} FROM ${this.table}`;
    }
    console.log(query);
    const data = await this.pool.query(query);
    return data;
  }

  async insert(columns, values) {
    const query = `INSERT INTO ${this.table} (${columns}) VALUES (${values})`;
    console.log(query);
    const data = await this.pool.query(query);
    return data.rows;
  }
  
 async update(columns, values) {
    const query = `UPDATE ${this.table} SET ${columns}=${values}`;
    console.log(query);
    const data = await this.pool.query(query);
    return data.rows;
  }
}

export default Model;
