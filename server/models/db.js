import { Pool } from 'pg';
import debug from 'debug';

class Model {
  constructor(table) {
    this.table = table;

    this.pool = new Pool();

    this.pool.on('error', (err, client) => {
      console.log('error');
    });
  }

  async select(columns, clause, values) {
    let query;
    if (clause) {
      query = `SELECT ${columns} FROM ${this.table} WHERE ${clause}`;
    } else {
      query = `SELECT ${columns} FROM ${this.table}`;
    }
    console.log(query);
    const { rows } = await this.pool.query(query, values);
    console.log(rows[0]);
    return rows[0];
  }

  async insert(columns, values, clause) {
    let query;
    if (clause) {
      query = `INSERT INTO ${this.table} (${columns}) VALUES (${values}) WHERE ${clause}`;
    } else {
      query = `INSERT INTO ${this.table} (${columns}) VALUES (${values})`;
    }
    // const query = `INSERT INTO ${this.table} (${columns}) VALUES (${values})`;
    console.log(query);
    const data = await this.pool.query(query);
    return data.rows;
  }

  async update(columns, clause, values) {
    const query = `UPDATE ${this.table} SET ${columns} WHERE ${clause} returning *`;
    try {
      const data = await this.pool.query(query, values);
      return data.rows;
    } catch (err) {
      throw err;
    }
  }
}

export default Model;
