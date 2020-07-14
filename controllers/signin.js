// @ts-nocheck

const handleSignin = (req, res, db, bcrypt) => {
    
    db.select("email", "hash").from("login")
    .where("email", '=', req.body.email)
    .then(data => {
        return bcrypt.compareSync(req.body.password, data[0].hash)
        ? db.select('*').from("users").where("email", '=', req.body.email)
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json("Unable to Get User"))
        : res.status(400).json("Wrong Credentials");
    })
    .catch(err => res.status(400).json("Wrong Credentials"));
};

module.exports = {
    handleSignin: handleSignin
};