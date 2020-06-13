import User from '@clonebook/models/user.js';

export async function post(req, res) {
    try {
        const query =  req.body.query;
        // select only public items so other things will not be returned
        await User.find({
            $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
                { username: { $regex: query, $options: 'i' } },
            ]
        }, ['firstName', 'lastName', 'username'], (err, result) => {
            if (err) {
                return res.status(500).json("Clonebook cannot get users")
            }
            return res.status(200).json(result)
        })
    } catch (ex) {
        return res.status(500).json("Cannot connect to database")
    }
}
