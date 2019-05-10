import jsonWebToken from 'jsonwebtoken';

const createToken = (data) => {
  const token = jsonWebToken.sign(data, 'secret', { expiresIn: '1h' });

  return token;
};

export default createToken;
