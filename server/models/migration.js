import { Pool } from 'pg';

const pool = new Pool();

pool.on('error', (err) => {
  console.log(err);
});

const migrate = pool.query(`DROP TABLE IF EXISTS users CASCADE;
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
  isAdmin BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO users (
    id, firstname, lastname, homeaddress, organization, organizationaddress, age, email, password, status, isadmin
    ) VALUES (
         21,
        'ejike',
        'igboko',
        'ejik ltd',
        'ndielu',
        'ugwueke',
        35,
        'ejike112@yahoo.com',
        '$2b$10$Nb05xLfWP5a08cN959MIzumezo8CT14G6q8a1UPDviUD2VvgkOo96',
        'unverified',
        false
)
`);

export default migrate;
