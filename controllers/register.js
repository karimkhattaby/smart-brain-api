// @ts-nocheck

const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json("Incorrect Form Submission");
    }
    const hashedPassword = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hashedPassword
        })
        .into("login")
        .returning("email")
        .then(loginEmail => trx.insert({
                name: name,
                email: email,
                joined: new Date()
            })
            .into("users")
            .returning('*')
            .then(user => res.json(user[0]))
        )
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json("Unable to Register"));
};

module.exports = {
    handleRegister: handleRegister
};