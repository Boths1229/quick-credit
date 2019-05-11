import user from '../models/users';
import { createToken, verifyToken } from '../helper/token';

class User {
  static signUp(req, res) {
    const { email, firstName, lastName } = req.body;
    user.push({
      ...req.body
    });

    return res.status(201).json({
      message: 'Signup successful',
      token: createToken({ email, firstName, lastName })
    });
  }

  static signIn(req, res) {
    const { email, password, token } = req.body;

    try {
      req.user = verifyToken(token);
    } catch (e) {
      return res.status(404).json({
        message: 'invalid email or password'
      });
    }

    if (req.user) {
      return res.status(200).json({
        email,
        password,
        message: 'signin successful',
      });
    }
  }

  static verifyUser(req, res) {
    const requestEmail = req.params.useremail;
    const verify = user.find(userfound => (userfound.email === requestEmail));
    if (!verify) {
      return res.status(404).json({
        message: 'addresses not verified'
      });
    }
    // Verify user
    verify.status = 'verified';
    return res.status(200).json({
      message: 'addresses verified',
      status: 200,
      data: {
        email: verify.email,
        firstName: verify.firstname,
        lastName: verify.lastname,
        password: verify.password,
        homeAddress: verify.homeAddress,
        organizationAddress: verify.organizationAddress,
        status: verify.status,
      },
    });
  }
}

export default User;
