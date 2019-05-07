import user from '../dummy/auth';

class User {
  static async signUp(req, res) {
    await user.push({
      ...req.body
    });

    return res.status(201).json({
      message: 'Signup successful',
      token: {
        ...req.body
      }
    });
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    user.filter((userfound) => {
      if (userfound.email === email && userfound.password === password) {
        return res.status(200).json({
          message: 'signin successful',
          token: { email, password }
        });
      }
      return res.status(409).json({
        message: 'invalid email or password'
      });
    });
  }
}

export default User;
