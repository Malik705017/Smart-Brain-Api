const registerHandler = (req,res,bcrypt,db) => {
    const {email, name, password} = req.body;

    if(!email || !password || !name){
        return res.status(400).json('incorrect form submission')
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    db.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return (
                trx('users')
                .insert({
                    email:loginEmail[0],
                    name:name,
                    joined: new Date()
                })
                .returning('*')
                .then(user => {
                    res.json(user[0]);
                })
                .catch(
                    err => {
                        res.status(400).send('unable to register')
                    }
                )
            )
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
}

export default registerHandler