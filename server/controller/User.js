import uuid from 'uuid';
import { createToken } from '../helper/token';
import Model from '../models/db';
import pass from '../helper/password';

class User {
  static model() {
    return new Model('users');
  }


  static async getAllUsers(req, res) {
    try {
      const rows = await User.model().select('id, firstName, lastName, email, homeAddress, organization, organizationAddress, status');
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
    try {
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
        message: 'signup successful',
        data: {
          token,
          id: uuid(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        }
      });
    } catch (e) {
      return res.status(500).json({
        error: 'server error'
      });
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const registered = await User.model().select('*', 'email=$1', [email]);

      if (registered && pass.decryptPassword(password, registered.password)) {
        const isAdmin = registered.isadmin;
        const token = createToken({ email, password, isAdmin });
        return res.status(200).json({
          status: 200,
          message: 'signin successful',
          data: {
            token,
            id: uuid(),
            firstName: registered.firstname,
            lastName: registered.lastname,
            email: registered.email
          }
        });
      } return res.status(401).json({
        message: 'invalid email or password'
      });
    } catch (e) {
      return res.status(500).json({
        error: 'server error'
      });
    }
  }

  static async verifyUser(req, res) {
    try {
      const { email } = req.params;
      const rows = await User.model().update('status=$1', 'email=$2', ['verified', email]);
      if (!rows) {
        return res.status(404).json({
          message: 'email not found'
        });
      }
      if (rows) {
        return res.status(200).json({
          status: 200,
          message: 'user verified',
          data: {
            email: rows.email,
            firstName: rows.firstname,
            lastName: rows.lastname,
            password: rows.password,
            homeaddress: rows.homeaddress,
            organizationaddress: rows.organizationaddress,
            status: rows.status,
          },
        });
      }
    } catch (e) {
      return res.status(500).json({
        error: 'server error'
      });
    }
  }
}

export default User;
