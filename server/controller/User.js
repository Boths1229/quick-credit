import user from '../dummy/user';

class User {
    static async signUp(req, res) {
        await user.push({
            ...req.body
        })

        return res.status(201).json({
            message: 'Signup successful',
            token: {
                ...req.body
            }
        })
    }
}

export default User;
