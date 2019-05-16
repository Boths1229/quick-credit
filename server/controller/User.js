import debug from 'debug';
import user from '../models/users';
import { createToken } from '../helper/token';
import Model from '../models/db';

class User {
  static model() {
    return new Model('users');
  }

  // static logger(message){
  //   return debug('dev'){message};
  // }

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
 email, firstName, lastName, homeAddress, organization, organizationAddress, age, status } = req.body;
    const token = createToken({ email, firstName, lastName });

    const { rows } = await User.model().insert(
      'email, firstName, lastName, homeAddress, organization, organizationAddress, age, status',
      `'${email}', '${firstName}', '${lastName}', '${homeAddress}', '${organization}', '${organizationAddress}', '${age}', '${status}'`
    );
    console.log('connected');
    return res.status(201).json({
      message: 'Signup successful',
      token
    });
  }

  static signIn(req, res) {
    const { email, password } = req.body;
    const token = createToken({ email, password });

    const registered = User.model().select(
      'id, email', `email='${email}'`
    );

    if (!registered) {
      return res.status(404).json({
        message: 'invalid email or password'
      });
    }

    return res.status(200).json({
      message: 'signin successful',
      token
    });
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
