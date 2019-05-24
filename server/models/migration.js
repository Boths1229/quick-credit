import dotenv from 'dotenv';
import { Pool } from 'pg';
import password from '../helper/password';

dotenv.config();
const pool = new Pool({ connectionString: process.env.DB_URL });

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
        true
);
DROP TABLE IF EXISTS loans CASCADE;
CREATE TABLE loans(
  Id SERIAL NOT NULL PRIMARY KEY,
  loanId SERIAL NOT NULL,
	firstName VARCHAR NOT NULL,
	lastName VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  tenor VARCHAR NOT NULL,
  amount FLOAT(2) NOT NULL,
  bankName VARCHAR NOT NULL,
  accountNumber VARCHAR NOT NULL,
  paymentInstallment FLOAT(2) NOT NULL,
  status VARCHAR(11) NOT NULL DEFAULT 'pending',
  repaid BOOLEAN NOT NULL DEFAULT false,
  balance FLOAT(2) NOT NULL DEFAULT 0.00,
  interest FLOAT(2) NOT NULL DEFAULT 5.00,
  createdOn TIMESTAMP DEFAULT NOW()
);
INSERT INTO loans (
  id, loanid, firstname, lastname, email, tenor, amount, bankname, accountnumber, paymentinstallment, status, 
  repaid, balance, interest )
   VALUES (
       1,
       1,
      'ejike',
      'igboko',
      'ejike112@yahoo.com',
      '4',
      60000,
      'diamond bank',
      123456789,
      15750,
      'approved',
      false,
      63000,
      3000
);
DROP TABLE IF EXISTS loanRepayment CASCADE;
CREATE TABLE loanRepayment(
  Id SERIAL NOT NULL PRIMARY KEY,
  loanId SERIAL NOT NULL,
  createdOn TIMESTAMP DEFAULT NOW(),
  amount FLOAT(2) NOT NULL
); 
INSERT INTO loanRepayment (
  id, loanid, amount )
   VALUES (
       1,
       15750
);
`);

export default migrate;
