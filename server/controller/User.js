import debug from 'debug';
import uuid from 'uuid';
import user from '../models/users';
import { createToken } from '../helper/token';
import Model from '../models/db';
import pass from '../helper/password';

class User {
  static model() {
    return new Model('users');
  }


  static async getAllUsers(req, res) {
    const { rows } = await User.model().select('id, email, firstName, lastName, age', 'id=2');
    console.log(JSON.stringify(rows, null, '\t'));
    try {
      if (rows.length === 0) {
        return res.status(400).json({
          message: 'No user found'
        });
      }

      return res.status(200).json({
        message: 'All users received successfully',
        data: rows,
        status: 200
      });
    } catch (e) {
      return res.status(500).json({
        message: 'server error'
      });
    }
  }

  static async signUp(req, res) {
    const {
      email, firstName, lastName, homeAddress, organization, organizationAddress, age,
    } = req.body;

    let { password } = req.body;
    const token = createToken({ email, firstName, lastName });
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
      const { email, password } = req.body;
      const registered = await User.model().select('*', 'email=$1', [email]);

      if (registered && pass.decryptPassword(password, registered.password)) {
        const token = createToken({ email, password });
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

  static verifyUser(req, res) {
    const requestEmail = req.params.useremail;
    const verifiedUser = user.find(userfound => (userfound.email === requestEmail));
    if (!verifiedUser) {
      return res.status(404).json({
        message: 'addresses not verified'
      });
    }

    verifiedUser.status = 'verified';
    return res.status(200).json({
      message: 'addresses verified',
      status: 200,
      data: {
        email: verifiedUser.email,
        firstName: verifiedUser.firstname,
        lastName: verifiedUser.lastname,
        password: verifiedUser.password,
        homeAddress: verifiedUser.homeAddress,
        organizationAddress: verifiedUser.organizationAddress,
        status: verifiedUser.status,
      },
    });
  }
}

export default User;
