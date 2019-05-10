/* eslint-disable require-jsdoc */
import user from '../models/users';
import createToken from '../helper/createToken';

class User {
  static signUp(req, res) {
   const { email, firstname, lastname } = req.body;
     user.push({
      ...req.body
    });

    return res.status(201).json({
      message: 'Signup successful',
      token: createToken({ email, firstname, lastname })
    });
  }

  // eslint-disable-next-line require-jsdoc
  static signIn(req, res) {
    const registered = {
      email: req.body.email,
      password: req.body.password,
    };
    const userFound = user.find(check => (check.email === registered.email && check.password === registered.password));
    // User not found
    if (!userFound) {
      return res.status(404).json({
        message: 'invalid email or password'
        /*status: 404,
        error: 'User not found',*/
      });
    }
    // User found
    return res.status(200).json({
      message: 'signin successful',
     // token: createToken({ email, firstname, lastname })
      //token: createToken({ email })
     /* data: {
        token: userFound.token,
        id: userFound.id,
        firstName: userFound.firstname,
        lastName: userFound.lastname,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
      },*/
    });
  }

  // eslint-disable-next-line require-jsdoc
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