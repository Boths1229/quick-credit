import user from '../models/users';
import { createToken } from '../helper/token';

class User {
  static signUp(req, res) {
    const { email, firstName, lastName } = req.body;
    const token = createToken({ email, firstName, lastName });

    user.push({
      ...req.body
    });

    return res.status(201).json({
      message: 'Signup successful',
      token
    });
  }

  static signIn(req, res) {
    const { email, password } = req.body;
    const token = createToken({ email, password });

    const registered = user.find(check => (check.email === req.body.email && check.password === req.body.password));

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
