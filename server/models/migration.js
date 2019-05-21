import { Pool } from 'pg';

const pool = new Pool();

pool.on('error', (err) => {
  console.log(err);
});

const migrate = pool.query(`DROP TABLE users IF EXISTS;
CREATE TABLE users(
	Id SERIAL NOT NULL PRIMARY KEY,
	firstName VARCHAR NOT NULL,
	lastName VARCHAR NOT NULL,
  homeAddress VARCHAR NOT NULL,
  organization VARCHAR NOT NULL,
  organizationAddress VARCHAR NOT NULL,
  age INT NOT NULL,
	email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  status VARCHAR(11) NOT NULL DEFAULT 'unverified',
  isAdmin BOOLEAN NOT NULL
);`);

export default migrate;
