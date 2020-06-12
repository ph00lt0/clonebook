import User from '@clonebook/models/user.js';

export async function get(req, res) {
    try{
        await User.find({}, 'firstName', (err, result) =>{
            if(err){return res.status(500).json("Clonebook cannot get users")}
            return res.status(200).json(result)
        })
    }
    catch(ex){
        return res.status(500).json("Cannot connect to database")
    }
}

