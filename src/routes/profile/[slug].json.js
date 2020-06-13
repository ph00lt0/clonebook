import User from '@clonebook/models/user.js';

export async function get(req, res, next) {
    const {slug} = req.params;
    User.findOne({username: slug}, ['firstName', 'lastName', 'username', 'avatar'], (err, result) => {
        if (err) {
            return res.status(500).json("Clonebook cannot get user")
        }
        return res.status(200).json(result)
    });
}

