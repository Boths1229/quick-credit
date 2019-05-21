import debug from 'debug';
import uuid from 'uuid';
import { createToken } from '../helper/token';
import Model from '../models/db';
import pass from '../helper/password';

class User {
  static model() {
    return new Model('users');
  }


  static async getAllUsers(req, res) {
    const rows = await User.model().select('id, firstName, lastName, email, homeAddress, organization, organizationAddress, status');
    
    try {
      if (rows.length === 0) {
        return res.status(400).json({
          message: 'No user found'
        });
      }

      return res.status(200).json({
        status: 200,
        data: rows,
        
      });
    } catch (e) {
      return res.status(500).json({
        error: 'server error'
      });
    }
  }

  static async signUp(req, res) {
    const {
      email, firstName, lastName, homeAddress, organization, organizationAddress, age
    } = req.body;

    let { password } = req.body;
    const token = createToken({
      email, firstName, lastName
    });
    password = pass.hashPassword(password);
    const { rows } = await User.model().insert(
      'email, firstName, lastName, homeAddress, organization, organizationAddress, age, password',
      `'${email}', '${firstName}', '${lastName}', '${homeAddress}', '${organization}', '${organizationAddress}', '${age}', '${password}'`
    );

    return res.status(201).json({
      status: 201,
      data: {
        token,
        id: uuid(), // id of newly created user
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      }
    });
  }

  static async signIn(req, res) {
    try {
      const { email, password, isAdmin } = req.body;
      const registered = await User.model().select('*', 'email=$1', [email]);

      if (registered && pass.decryptPassword(password, registered.password)) {
        const token = createToken({ email, password, isAdmin });
        return res.status(200).json({
          status: 200,
          data: {
            token,
            id: uuid(), // user id
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
          }
        });
      } return res.status(401).json({
        message: 'invalid email or password'
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  static async verifyUser(req, res) {
    try {
      const { email } = req.params;
      const rows = await User.model().update('status=$1', 'email=$2', ['verified', email]);
      console.log(`${req.params.email}`, rows);
      if (rows[0]) {
        return res.status(200).json({
          status: 200,
          data: {
            email: rows[0].email,
            firstName: rows[0].firstname,
            lastName: rows[0].lastname,
            password: rows[0].password,
            homeaddress: rows[0].homeaddress,
            organizationaddress: rows[0].organizationaddress,
            status: rows[0].status,
          },
        });
      }
      return res.status(404).json({
        message: 'email not found'
      });
    } catch (err) {
      console.log(err.message);
    }
  }
}

export default User;
